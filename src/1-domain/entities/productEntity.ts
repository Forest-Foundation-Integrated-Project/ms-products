import { randomUUID } from 'crypto'

import { Either, right } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { AbstractEntity } from './abstractEntity'

export interface IProductEntity {
  product_id?: string
  name: string
  description: string
  seller_id?: string
  price_cents: bigint
  tag_id?: string
  createdAt?: Date
  updatedAt?: Date
}

export class ProductEntity extends AbstractEntity<IProductEntity> {
  static create(props: IProductEntity): Either<IError, ProductEntity> {
    const product = new ProductEntity({
      ...props,
      product_id: randomUUID(),
      seller_id: randomUUID(),
      tag_id: randomUUID()
    })

    return right(product)
  }
}
