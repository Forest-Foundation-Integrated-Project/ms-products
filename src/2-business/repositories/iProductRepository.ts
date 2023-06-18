import { IProductEntity } from "../../1-domain/entities/productEntity"
import { InputRemoveProductDto, InputUpdateProductDto } from "../dto/productDto"
import { InputViewAllProductDto } from "../dto/viewAllProductsDto"

export const IProductRepositoryToken = Symbol.for('IProductRepository')

export enum SortItems {
  ASC = 'ascending',
  DEC = 'descending',
}

export interface ViewAllProductsResponse {
  total: number
  limit: number
  lastKey: Object
  data: IProductEntity[]
}


export interface IProductRepository {
  create(productEntity: IProductEntity): Promise<IProductEntity>
  view(productId: string): Promise<IProductEntity>
  remove(removeProductsProps: InputRemoveProductDto): Promise<boolean>
  update(productEntity: InputUpdateProductDto): Promise<IProductEntity>
  viewAll(viewAllProps: InputViewAllProductDto): Promise<ViewAllProductsResponse>
}
