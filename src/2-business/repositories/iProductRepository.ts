import { IProductEntity } from "../../1-domain/entities/productEntity"
import { InputCreateProductDto, InputRemoveProductDto, InputUpdateProductDto } from "../dto/productDto"

export const IProductRepositoryToken = Symbol.for('IProductRepository')

export interface IProductRepository {
  create(productEntity: IProductEntity): Promise<IProductEntity>
  view(productId: string): Promise<IProductEntity>
  remove(removeProductsProps: InputRemoveProductDto): Promise<boolean>
  update(productEntity: InputUpdateProductDto): Promise<IProductEntity>
  viewAll(
    name?: string,
    createdAt?: string,
    price_cents?: string,
    per_page?: string,
    page?: string
  ): Promise<IProductEntity[]>
}
