import { injectable, inject } from 'inversify'
import { ViewAllProductUseCase } from '../../2-business/useCases/viewAllProductUseCase'

import { left, right } from '../../4-framework/shared/either'
import {  OutputViewAllProduct } from '../serializers/inputViewAllProduct'
import { InputViewAllProduct } from '../serializers/inputViewAllProduct'
import { AbstractOperator } from './abstractOperator'

@injectable()
export class ViewAllProductOperator extends AbstractOperator<InputViewAllProduct, OutputViewAllProduct> {
  public constructor(@inject(ViewAllProductUseCase) private viewAllProductUseCase: ViewAllProductUseCase) {
    super()
  }

  protected async run(input: InputViewAllProduct): Promise<OutputViewAllProduct> {
    const result = await this.viewAllProductUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
