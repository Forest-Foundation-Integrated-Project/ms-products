import { ContainerModule, interfaces } from 'inversify'
import { CreateProductUseCase } from '../../2-business/useCases/createProductUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateProductUseCase).toSelf()
})
