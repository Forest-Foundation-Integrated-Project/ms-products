import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"
import { ISignedUrlResponse } from "../dto/getSignedUploadProductImageURLDto"

export const IStorageServiceToken = Symbol.for('IStorageService')

export interface IGetSignedURL {
  sellerId: string
  productId: string
}

export interface IGetFiles {
  sellerId: string
  productId: string
}

export interface IStorageService {
  getSignedURL(props: IGetSignedURL): Promise<Either<IError, ISignedUrlResponse>>
  getFiles(props: IGetFiles): Promise<Either<IError, string[]>>
}
