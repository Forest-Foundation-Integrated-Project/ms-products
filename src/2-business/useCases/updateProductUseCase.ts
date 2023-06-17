import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { ProductNotFound, ProductUpdateFailed } from '../module/errors/products'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'
import { InputUpdateProductDto, OutputUpdateProductDto } from '../dto/productDto'
import { UserIdentityCannotBeValidated } from '../module/errors/users'

@injectable()
export class UpdateProductUseCase implements IUseCase<InputUpdateProductDto, OutputUpdateProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) {}

  async exec(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    try {
      if (input.sellerId !== input.userContextId) {
        return left(UserIdentityCannotBeValidated)
      }

      const product = await this.productRepository.update(input)
      if (!product) return left (ProductNotFound)

      return right(product)
    } catch (error) {
      console.log('deu ruim ', error)
      return left(ProductUpdateFailed)
    }
  }
}
