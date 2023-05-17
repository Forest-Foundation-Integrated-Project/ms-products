import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputViewProductDto, OutputViewProductDto } from '../dto/productDto'
import { ProductViewingFailed } from '../module/errors/products'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'

@injectable()
export class ViewProductUseCase implements IUseCase<InputViewProductDto, OutputViewProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) {}

  async exec(input: InputViewProductDto): Promise<OutputViewProductDto> {
    try {
      const product = await this.productRepository.view(input.product_id)

      return right(product)
    } catch (error) {
      return left(ProductViewingFailed)
    }
  }
}
