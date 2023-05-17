import { IProductEntity } from "../../1-domain/entities/productEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export interface InputCreateProductDto {
  name: string
}

export interface InputViewProductDto {
  product_id: string
}

export interface InputRemoveProductDto {
  product_id: string
}

export type OutputCreateProductDto = Either<IError, IProductEntity>
export type OutputViewProductDto = Either<IError, IProductEntity>
export type OutputRemoveProductDto = Either<IError, boolean>
