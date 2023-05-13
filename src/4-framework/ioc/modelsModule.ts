import { ContainerModule, interfaces } from 'inversify'

import { ProductModel } from '../models/productModel'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ProductModel>(ProductModel).toConstructor(ProductModel)
})
