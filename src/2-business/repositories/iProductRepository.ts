import { IProductEntity } from "../../1-domain/entities/productEntity"

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(productEntity: IProductEntity): Promise<IProductEntity>
}