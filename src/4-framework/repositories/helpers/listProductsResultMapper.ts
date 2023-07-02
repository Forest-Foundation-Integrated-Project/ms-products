import { ProductModel } from '../../models/productModel'
import { IProductEntity } from '../../../1-domain/entities/productEntity'

export const listProductsResultMapper = (product: typeof ProductModel): IProductEntity => {
  delete product?.pk
  delete product?.sk

  return product
}
