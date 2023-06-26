import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

import { Either } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { Validatable } from './abstractValidatable'
import { ISignedUrlResponse } from '../../2-business/dto/getSignedUploadProductImageURLDto'


export class InputGetSignedUploadProductImageURL extends Validatable<InputGetSignedUploadProductImageURL> {
  @IsOptional()
  @IsUUID()
  userContextId!: string

  @IsNotEmpty()
  @IsUUID()
  productId!: string

  @IsNotEmpty()
  @IsUUID()
  sellerId!: string
}

export type OutputGetSignedUploadProductImageURL = Either<IError, ISignedUrlResponse>
