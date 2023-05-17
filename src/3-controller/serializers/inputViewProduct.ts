import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { IProductEntity } from '../../1-domain/entities/productEntity'

export class InputViewProduct extends Validatable<InputViewProduct> {
  @IsNotEmpty()
  @IsUUID()
  product_id!: string
}

export type OutputViewProduct = Either<IError, IProductEntity>
