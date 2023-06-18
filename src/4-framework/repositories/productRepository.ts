import { inject, injectable } from "inversify"
import * as dynamoose from 'dynamoose'

import { ProductModel } from "../models/productModel"
import { IProductEntity } from "../../1-domain/entities/productEntity"
import { IProductRepository, ViewAllProductsResponse } from "../../2-business/repositories/iProductRepository"
import { InputRemoveProductDto, InputUpdateProductDto } from "../../2-business/dto/productDto"
import { FilterBy, InputViewAllProductDto } from "../../2-business/dto/viewAllProductsDto"

enum Prefixes {
  products = 'PRODUCTS'
}

enum IndexPrefixes {
  PRODUCTS_CREATED_AT = 'productsCreatedAt'
}

@injectable()
export class ProductRepository implements IProductRepository {
  public constructor(@inject(ProductModel) private productModel: typeof ProductModel) { }
  private readonly pk = Prefixes.products

  async create(input: IProductEntity): Promise<IProductEntity> {
    const pk = Prefixes.products
    const sk = input.productId

    const result = await this.productModel.create({
      pk,
      sk,
      ...input,
    })

    delete result?.pk
    delete result?.sk

    return result
  }

  async view(productId: string): Promise<IProductEntity> {
    const response = await this.productModel.query({
      pk: this.pk,
      sk: productId,
    }).exec()
    const result = response.toJSON()[0]

    delete result?.pk
    delete result?.sk

    return result
  }

  async update(product: InputUpdateProductDto): Promise<IProductEntity> {
    const condition = new dynamoose.Condition().where('sellerId').eq(product.sellerId)
    const response = await this.productModel.update({
      pk: Prefixes.products,
      sk: product.productId,
    }, {
      title: product.title,
      description: product.description,
      priceCents: product.priceCents,
      tagId: product.tagId
    }, {
      condition: condition
    })

    delete response?.pk
    delete response?.sk

    return response
  }

  async remove(removeProductsProps: InputRemoveProductDto): Promise<boolean> {
    const condition = new dynamoose.Condition().where('sellerId').eq(removeProductsProps.userContextId)
    const response = await this.productModel.delete({
      pk: Prefixes.products,
      sk: removeProductsProps.productId,
    },
      {
        condition
      })

    return response
  }

  async viewAll(props: InputViewAllProductDto): Promise<ViewAllProductsResponse> {
    const queryProps = {
      pk: Prefixes.products,
    }

    const sortOrder = props.sort ?? 'descending'

    const productsQuery = this.productModel
      .query(queryProps)
      .using(IndexPrefixes.PRODUCTS_CREATED_AT)
      .sort(sortOrder)

    if (props.lastKey) {
      productsQuery.startAt({ pk: Prefixes.products, sk: props.lastKey })
    }

    if (props.where) {
      productsQuery.where(props.where)
        .eq(props.where === FilterBy.PRICE_CENTS ? Number(props.like) : props.like)
    }

    if (props.limit && !props.ignoreLimit) {
      productsQuery.limit(Number(props.limit))
    }

    return productsQuery.exec().then(async (items: any) => {
      if (items.toJSON().length < props.limit && items.lastKey) {
        return this.viewAll({
          ...props,
          data: props?.data ? [...props.data, ...items.toJSON()] : items.toJSON(),
          lastKey: JSON.stringify(items.lastKey),
          total: items.count + props.total,
          ignoreLimit: true,
        })
      }

      if (items.toJSON().length > props.limit) {
        const totalData = [...props.data!, ...items.toJSON()]
        const dataToSend = totalData.slice(0, Number(props.limit))
        const lastKey = totalData[totalData.length - 1]?.sk

        return {
          total: Number(props.limit),
          limit: Number(props.limit) ?? null,
          lastKey: items.lastKey ? items.lastKey.sk : lastKey,
          data: dataToSend,
        }
      }

      return {
        total: props?.data?.length ? props.data.length : items.count,
        limit: Number(props.limit) ?? null,
        lastKey: items.lastKey ? items.lastKey.sk : null,
        data: props?.data?.length ? [...props?.data, ...items.toJSON()] : items.toJSON(),
      }
    })
  }
}
