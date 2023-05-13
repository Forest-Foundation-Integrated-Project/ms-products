import { ContainerModule, interfaces } from 'inversify'

import { IProductRepository, IProductRepositoryToken } from '../../2-business/repositories/iProductRepository'
import { ProductRepository } from '../repositories/productRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IProductRepository>(IProductRepositoryToken).to(ProductRepository)
})
