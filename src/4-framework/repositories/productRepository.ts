import { injectable, inject } from 'inversify'
import { IProductRepository } from '../../2-business/repositories/iProductRepository'
import { ProductModel } from '../models/productModel'
import { IProductEntity } from '../../1-domain/entities/productEntity'

@injectable()
export class ProductRepository implements IProductRepository {
  public constructor(@inject(ProductModel) private productModel: typeof ProductModel) {}

  async create(productEntity: IProductEntity): Promise<IProductEntity> {
    const createResponse = await this.productModel.create({
      product_id: productEntity.product_id,
      name: productEntity.name
    })

    delete createResponse.dataValues.password

    return createResponse.dataValues
  }

  async view(product_id: string): Promise<IProductEntity> {
    const viewResponse = await this.productModel.findByPk(product_id)

    return viewResponse?.dataValues
  }
}
