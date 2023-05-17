import { ContainerModule, interfaces } from 'inversify'
import { CreateProductOperator } from '../../3-controller/operators/createProductOperator'
import { ViewProductOperator } from '../../3-controller/operators/viewProductOperator'
import { RemoveProductOperator } from '../../3-controller/operators/removeProductOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateProductOperator).toSelf()
  bind(ViewProductOperator).toSelf()
  bind(RemoveProductOperator).toSelf()
})
