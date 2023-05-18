import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { InputUpdateProduct, OutputUpdateProduct } from '../serializers/inputUpdateProduct'
import { UpdateProductUseCase } from '../../2-business/useCases/updateProductUseCase'

@injectable()
export class UpdateProductOperator extends AbstractOperator<InputUpdateProduct, OutputUpdateProduct> {
  public constructor(@inject(UpdateProductUseCase) private updateProductUseCase: UpdateProductUseCase) {
    super()
  }

  protected async run(input: InputUpdateProduct): Promise<OutputUpdateProduct> {
    const result = await this.updateProductUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
