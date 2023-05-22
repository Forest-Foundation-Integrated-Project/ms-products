import { injectable, inject } from 'inversify'
import { ViewProductUseCase } from '../../2-business/useCases/viewProductUseCase'

import { left, right } from '../../4-framework/shared/either'
import { InputViewProduct, OutputViewProduct } from '../serializers/inputViewProduct'
import { AbstractOperator } from './abstractOperator'

@injectable()
export class ViewAllProductOperator extends AbstractOperator<InputViewProduct, OutputViewProduct> {
  public constructor(@inject(ViewProductUseCase) private viewProductUseCase: ViewProductUseCase) {
    super()
  }

  protected async run(input: InputViewProduct): Promise<OutputViewProduct> {
    const result = await this.viewProductUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
