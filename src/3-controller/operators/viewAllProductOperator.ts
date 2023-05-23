import { injectable, inject } from 'inversify'
import { ViewAllProductUseCase } from '../../2-business/useCases/viewAllProductUseCase'

import { left, right } from '../../4-framework/shared/either'
import {  OutputViewAllProduct } from '../serializers/inputViewAllProduct'
import { AbstractOperator } from './abstractOperator'

@injectable()
export class ViewAllProductOperator extends AbstractOperator<undefined, OutputViewAllProduct> {
  public constructor(@inject(ViewAllProductUseCase) private viewAllProductUseCase: ViewAllProductUseCase) {
    super()
  }

  protected async run(): Promise<OutputViewAllProduct> {
    const result = await this.viewAllProductUseCase.exec()

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
