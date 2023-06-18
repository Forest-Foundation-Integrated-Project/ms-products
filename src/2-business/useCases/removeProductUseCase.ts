import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'
import { InputRemoveProductDto, OutputRemoveProductDto } from '../dto/productDto'
import { ProductNotFound, ProductRemovalFailed } from '../module/errors/products'

@injectable()
export class RemoveProductUseCase implements IUseCase<InputRemoveProductDto, OutputRemoveProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) {}

  async exec(input: InputRemoveProductDto): Promise<OutputRemoveProductDto> {
    try {
      const productResult = await this.productRepository.remove(input)
      console.log('RemoveProductUseCase::ProductResult => ', productResult)

      // if (!productResult) return left (ProductNotFound)

      return right(true)
    } catch (error) {
      console.log('RemoveProductUseCase::Error => ', error)

      return left(ProductRemovalFailed)
    }
  }
}
