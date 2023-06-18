import { IProductEntity } from "../../1-domain/entities/productEntity"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"
import { SortItems, ViewAllProductsResponse } from "../repositories/iProductRepository"

export enum FilterBy {
  DATE = 'date',
  PRICE_CENTS = 'priceCents'
}

export interface InputViewAllProductDto {
  sort?: SortItems
  where?: FilterBy
  like?: string
  limit: number
  lastKey?: string
  categoryId?: string
  ignoreLimit?: boolean
  total?: number
  data?: Object[]
}

export type OutputViewAllProductDto = Either<IError, ViewAllProductsResponse>
