import { ContainerModule, interfaces } from 'inversify'
import { CreateProductUseCase } from '../../2-business/useCases/createProductUseCase'
import { ViewProductUseCase } from '../../2-business/useCases/viewProductUseCase'
import { RemoveProductUseCase } from '../../2-business/useCases/removeProductUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateProductUseCase).toSelf()
  bind(ViewProductUseCase).toSelf()
  bind(RemoveProductUseCase).toSelf()
})
