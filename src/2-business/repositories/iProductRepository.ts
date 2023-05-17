import { IProductEntity } from "../../1-domain/entities/productEntity"

export const IProductRepositoryToken = Symbol.for('IProductRepository')

export interface IProductRepository {
  create(productEntity: IProductEntity): Promise<IProductEntity>
  view(product_id: string): Promise<IProductEntity>
  remove(product_id: string): Promise<boolean>
}