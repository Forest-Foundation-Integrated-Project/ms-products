import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { InputViewAllProductDto, OutputViewAllProductDto } from '../dto/viewAllProductsDto'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'
import { ProductViewingFailed } from '../module/errors/products'
import { IUseCase } from './iUseCase'

@injectable()
export class ViewAllProductUseCase implements IUseCase<InputViewAllProductDto, OutputViewAllProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) {}

  async exec(input: InputViewAllProductDto): Promise<OutputViewAllProductDto> {
    try {
      const product = await this.productRepository.viewAll(input);

      return right(product);
    } catch (error) {
      console.log('ViewAllProductUseCase::Error ', error)

      return left(ProductViewingFailed)
    }
  }
}
