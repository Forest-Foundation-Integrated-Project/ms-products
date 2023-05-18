import { IProductEntity } from "../../1-domain/entities/productEntity"
import { InputUpdateProductDto } from "../dto/productDto"

export const IProductRepositoryToken = Symbol.for('IProductRepository')

export interface IProductRepository {
  create(productEntity: IProductEntity): Promise<IProductEntity>
  view(product_id: string): Promise<IProductEntity>
  remove(product_id: string): Promise<boolean>
  update(productEntity: InputUpdateProductDto): Promise<IProductEntity>
}