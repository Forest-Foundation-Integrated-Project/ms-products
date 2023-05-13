import { ContainerModule, interfaces } from 'inversify'
import { CreateProductOperator } from '../../3-controller/operators/createProductOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateProductOperator).toSelf()
})
