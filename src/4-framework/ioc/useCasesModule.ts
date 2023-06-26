import { ContainerModule, interfaces } from 'inversify'
import { CreateProductUseCase } from '../../2-business/useCases/createProductUseCase'
import { ViewProductUseCase } from '../../2-business/useCases/viewProductUseCase'
import { RemoveProductUseCase } from '../../2-business/useCases/removeProductUseCase'
import { UpdateProductUseCase } from '../../2-business/useCases/updateProductUseCase'
import { ViewAllProductUseCase } from '../../2-business/useCases/viewAllProductUseCase'
import { GetSignedUploadProductImageURLUseCase } from '../../2-business/useCases/getSignedUploadProductImageURLUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateProductUseCase).toSelf()
  bind(ViewProductUseCase).toSelf()
  bind(ViewAllProductUseCase).toSelf()
  bind(RemoveProductUseCase).toSelf()
  bind(UpdateProductUseCase).toSelf()
  bind(GetSignedUploadProductImageURLUseCase).toSelf()
})
