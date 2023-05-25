import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { IProductEntity } from '../../1-domain/entities/productEntity'

export class InputViewAllProduct extends Validatable<InputViewAllProduct> {
  /*@IsString()
  filter_by?: string*/
}

export type OutputViewAllProduct = Either<IError, IProductEntity[]>
