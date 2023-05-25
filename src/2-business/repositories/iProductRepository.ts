import { IProductEntity } from "../../1-domain/entities/productEntity"
import { InputCreateProductDto, InputUpdateProductDto } from "../dto/productDto"

export const IProductRepositoryToken = Symbol.for('IProductRepository')

export interface IProductRepository {
  create(productEntity: InputCreateProductDto): Promise<IProductEntity>
  view(product_id: string): Promise<IProductEntity>
  remove(product_id: string): Promise<boolean>
  update(productEntity: InputUpdateProductDto): Promise<IProductEntity>
  viewAll(name?: string): Promise<IProductEntity[]>
}