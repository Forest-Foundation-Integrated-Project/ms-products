import { injectable, inject } from 'inversify'

import { InputViewProductDto, OutputViewProductDto } from '../dto/productDto'
import { ProductNotFound, ProductViewingFailed } from '../module/errors/products'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'
import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'

@injectable()
export class ViewProductUseCase implements IUseCase<InputViewProductDto, OutputViewProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) {}

  async exec(input: InputViewProductDto): Promise<OutputViewProductDto> {
    try {
      const product = await this.productRepository.view(input.productId)

      if (!product) {
        return left(ProductNotFound)
      }

      return right(product);
    } catch (error) {
      console.log('ViewProductUseCase::Error ', error)

      return left(ProductViewingFailed)
    }
  }
}
