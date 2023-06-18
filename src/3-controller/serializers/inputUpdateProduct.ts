import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { IProductEntity } from '../../1-domain/entities/productEntity'

export class InputUpdateProduct extends Validatable<InputUpdateProduct> {
  @IsNotEmpty()
  @IsUUID()
  productId!: string

  @IsNotEmpty()
  @IsUUID()
  userContextId!: string

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsUUID()
  sellerId?: string

  @IsOptional()
  @IsNumber()
  priceCents?: bigint

  @IsOptional()
  @IsString()
  tagId?: string
}

export type OutputUpdateProduct = Either<IError, IProductEntity>
