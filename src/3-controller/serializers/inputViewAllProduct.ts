import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'

import { SortItems, ViewAllProductsResponse } from '../../2-business/repositories/iProductRepository'
import { FilterBy } from '../../2-business/dto/viewAllProductsDto'
import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputViewAllProduct extends Validatable<InputViewAllProduct> {
  @IsOptional()
  @IsIn(Object.values(SortItems))
  sort?: SortItems

  @IsOptional()
  @IsUUID()
  sellerId?: string

  @IsOptional()
  @IsIn(Object.values(FilterBy))
  where?: FilterBy

  @ValidateIf((obj) => obj.where)
  @IsNotEmpty()
  @IsString()
  like?: string

  @IsNotEmpty()
  @IsNumber()
  limit!: number

  @IsOptional()
  @IsString()
  lastKey?: string

  @IsOptional()
  @IsUUID()
  categoryId?: string
}

export type OutputViewAllProduct = Either<IError, ViewAllProductsResponse>
