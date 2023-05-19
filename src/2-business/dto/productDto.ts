import { IProductEntity } from "../../1-domain/entities/productEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export interface InputCreateProductDto {
  name: string
  description: string
  price: bigint
}

export interface InputViewProductDto {
  product_id: string
}

export interface InputRemoveProductDto {
  product_id: string
}

export interface InputUpdateProductDto {
  product_id: string
  name?: string
  description?: string
  seller_id?: string
  price?: bigint
  tag_id?: string
}

export type OutputCreateProductDto = Either<IError, IProductEntity>
export type OutputViewProductDto = Either<IError, IProductEntity>
export type OutputRemoveProductDto = Either<IError, boolean>
export type OutputUpdateProductDto = Either<IError, IProductEntity>
