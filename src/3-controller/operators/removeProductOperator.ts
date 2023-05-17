import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { InputRemoveProduct, OutputRemoveProduct } from '../serializers/inputRemoveProduct'
import { RemoveProductUseCase } from '../../2-business/useCases/removeProductUseCase'

@injectable()
export class RemoveProductOperator extends AbstractOperator<InputRemoveProduct, OutputRemoveProduct> {
  public constructor(@inject(RemoveProductUseCase) private removeProductUseCase: RemoveProductUseCase) {
    super()
  }

  protected async run(input: InputRemoveProduct): Promise<OutputRemoveProduct> {
    const result = await this.removeProductUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
