import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { CreateProductUseCase } from '../../2-business/useCases/createProductUseCase'
import { InputCreateProduct, OutputCreateProduct } from '../serializers/inputCreateProduct'

@injectable()
export class CreateProductOperator extends AbstractOperator<InputCreateProduct, OutputCreateProduct> {
  public constructor(@inject(CreateProductUseCase) private createProductUseCase: CreateProductUseCase) {
    super()
  }

  protected async run(input: InputCreateProduct): Promise<OutputCreateProduct> {
    const result = await this.createProductUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
