import { IProductEntity } from "../../1-domain/entities/productEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export interface InputCreateProductDto {
  userContextId: string
  title: string
  description: string
  priceCents: bigint
  tagId?: string
  sellerId: string,
  seller: {
    name: string
  }
}

export interface InputViewProductDto {
  productId: string
}

export interface InputRemoveProductDto {
  userContextId: string
  productId: string
}

export interface InputUpdateProductDto {
  userContextId: string
  productId: string
  title?: string
  description?: string
  sellerId?: string
  priceCents?: bigint
  tagId?: string
}

type IResponseProduct = Either<IError, IProductEntity>

export type OutputCreateProductDto = IResponseProduct
export type OutputViewProductDto = IResponseProduct
export type OutputRemoveProductDto = Either<IError, boolean>
export type OutputUpdateProductDto = IResponseProduct
