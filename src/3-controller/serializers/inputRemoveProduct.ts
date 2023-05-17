import { IsNotEmpty, IsUUID } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputRemoveProduct extends Validatable<InputRemoveProduct> {
  @IsNotEmpty()
  @IsUUID()
  product_id!: string
}

export type OutputRemoveProduct = Either<IError, boolean>
