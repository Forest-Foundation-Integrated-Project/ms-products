import { inject, injectable } from "inversify"
import * as dynamoose from 'dynamoose'

import { ProductModel } from "../models/productModel"
import { IProductEntity } from "../../1-domain/entities/productEntity"
import { IProductRepository } from "../../2-business/repositories/iProductRepository"
import { InputRemoveProductDto, InputUpdateProductDto } from "../../2-business/dto/productDto"

enum Prefixes {
  products = 'PRODUCTS'
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

    delete result.pk
    delete result.sk

    return result
  }

  async view(productId: string): Promise<IProductEntity> {
    const response = await this.productModel.query({
      pk: this.pk,
      sk: productId,
    }).exec()
    const result = response.toJSON()[0]

    delete result.pk
    delete result.sk

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
    }, {
      condition: condition
    })

    return response
  }
}
