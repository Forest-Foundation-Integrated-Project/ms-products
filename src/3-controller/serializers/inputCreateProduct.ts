import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { IProductEntity } from '../../1-domain/entities/productEntity'
import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

class Seller {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class InputCreateProduct extends Validatable<InputCreateProduct> {
  @IsNotEmpty()
  @IsUUID()
  userContextId!: string

  @IsNotEmpty()
  @IsString()
  title!: string

  @IsNotEmpty()
  @IsString()
  description!: string

  @IsNotEmpty()
  @IsNumber()
  priceCents!: bigint

  @IsOptional()
  @IsUUID()
  tagId?: string

  @IsNotEmpty()
  @IsUUID()
  sellerId!: string

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Seller)
  seller!: Object
}

export type OutputCreateProduct = Either<IError, IProductEntity>
