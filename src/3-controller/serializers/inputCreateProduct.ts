import { IsNotEmpty, IsString } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { IProductEntity } from '../../1-domain/entities/productEntity'

export class InputCreateProduct extends Validatable<InputCreateProduct> {
  @IsNotEmpty()
  @IsString()
  name!: string
}

export type OutputCreateProduct = Either<IError, IProductEntity>
