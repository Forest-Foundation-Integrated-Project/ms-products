import { IsNotEmpty, IsString } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { IProductEntity } from '../../1-domain/entities/productEntity'

export class InputUpdateProduct extends Validatable<InputUpdateProduct> {
  @IsNotEmpty()
  @IsString()
  product_id!: string

  @IsNotEmpty()
  @IsString()
  name!: string
}

export type OutputUpdateProduct = Either<IError, IProductEntity>
