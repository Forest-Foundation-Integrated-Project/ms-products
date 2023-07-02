import { inject, injectable } from "inversify"
import * as dynamoose from 'dynamoose'

import { ProductModel } from "../models/productModel"
import { IProductEntity } from "../../1-domain/entities/productEntity"
import { IProductRepository, ViewAllProductsResponse } from "../../2-business/repositories/iProductRepository"
import { InputRemoveProductDto, InputUpdateProductDto } from "../../2-business/dto/productDto"
import { FilterBy, InputViewAllProductDto } from "../../2-business/dto/viewAllProductsDto"
import { listProductsResultMapper } from "./helpers/listProductsResultMapper"
import { queryPagination } from "./helpers/customPagination"

enum Prefixes {
  products = 'PRODUCTS'
}

enum IndexPrefixes {
  PRODUCTS_CREATED_AT = 'productsCreatedAt',
  USER_PRODUCTS_INDEX = 'userProductsIndex'
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
      ...(product?.title && { title: product.title }),
      ...(product?.description && { description: product.description }),
      ...(product?.priceCents && { priceCents: product.priceCents }),
      ...(product?.tagId && { tagId: product.tagId }),
      ...(product?.images && { images: product.images })
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
    const startAt = props.lastKey ? JSON.parse(props.lastKey.replace(/'/g, '')) : null

    let productsQuery = this.productModel
      .query(queryProps)
      .using(IndexPrefixes.PRODUCTS_CREATED_AT)
      .sort(sortOrder)

    if (props.sellerId) {
      productsQuery = this.productModel
        .query({ sellerId: props.sellerId })
        .using(IndexPrefixes.USER_PRODUCTS_INDEX)
        .sort(sortOrder)
    }

    if (props.where) {
      switch (props.where) {
        case FilterBy.PRICE_CENTS:
          productsQuery.where(props.where)
            .eq(Number(props.like))
          break;
        case FilterBy.TITLE:
          productsQuery.where(props.where)
            .contains(props.like)
          break;

        default:
          productsQuery.where(props.where)
            .eq(props.like)
          break;
      }
    }

    if (startAt) {
      startAt.createdAt = new Date(startAt.createdAt).getTime()
    }

    const data = await queryPagination({
      query: productsQuery,
      data: [],
      limit: props.limit,
      timesQueried: 1,
      count: 0,
      lastKey: startAt,
    })

    data.data = data.data.map((item: IProductEntity) => listProductsResultMapper(item))

    return data
  }
}
