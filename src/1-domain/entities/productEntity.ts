import { randomUUID } from 'crypto'

import { Either, right } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { AbstractEntity } from './abstractEntity'

export interface IProductEntity {
  productId?: string
  title: string
  description: string
  priceCents: bigint
  tagId?: string
  sellerId: string,
  seller: {
    name: string
  }
  images?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export class ProductEntity extends AbstractEntity<IProductEntity> {
  static create(props: IProductEntity): Either<IError, ProductEntity> {
    const product = new ProductEntity({
      ...props,
      productId: randomUUID(),
    })

    return right(product)
  }
}
