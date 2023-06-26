import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export interface InputGetSignedUploadProductImageURLDto {
  sellerId: string
  productId: string
  userContextId?: string
}

export interface ISignedUrlResponse {
  url: string
  fileName: string
}

export type OutputGetSignedUploadProductImageURLDto = Either<IError, ISignedUrlResponse>
