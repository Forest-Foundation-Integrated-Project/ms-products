import { randomUUID } from 'crypto'

import { Either, right } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { AbstractEntity } from './abstractEntity'

export interface IProductEntity {
  prod_id?: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class ProductEntity extends AbstractEntity<IProductEntity> {
  static create(props: IProductEntity): Either<IError, ProductEntity> {
    const product = new ProductEntity({
      ...props,
      prod_id: randomUUID(),
    })

    return right(product)
  }
}
