import { IProductEntity } from "../../1-domain/entities/productEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"
import { SortItems, ViewAllProductsResponse } from "../repositories/iProductRepository"

export enum FilterBy {
  DATE = 'date',
  PRICE_CENTS = 'priceCents',
  TITLE = 'title'
}

export interface InputViewAllProductDto {
  sort?: SortItems
  sellerId?: string
  where?: FilterBy
  like?: string
  limit: number
  lastKey?: string
  categoryId?: string
}

export type OutputViewAllProductDto = Either<IError, ViewAllProductsResponse>
