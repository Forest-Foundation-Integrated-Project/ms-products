import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { IProductEntity } from '../../1-domain/entities/productEntity'

export class InputUpdateProduct extends Validatable<InputUpdateProduct> {
  @IsNotEmpty()
  @IsString()
  product_id!: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  seller_id?: string

  @IsOptional()
  @IsNumber()
  price?: bigint

  @IsOptional()
  @IsString()
  tag_id?: string
}

export type OutputUpdateProduct = Either<IError, IProductEntity>
