import { injectable, inject } from 'inversify'

import { InputUpdateProductDto, OutputUpdateProductDto } from '../dto/productDto'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'
import { ProductBelongsToAnotherUser, ProductNotFound, ProductUpdateFailed } from '../module/errors/products'
import { UserIdentityCannotBeValidated } from '../module/errors/users'
import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'

@injectable()
export class UpdateProductUseCase implements IUseCase<InputUpdateProductDto, OutputUpdateProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) { }

  async exec(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    try {
      if (input.sellerId !== input.userContextId)
        return left(UserIdentityCannotBeValidated)

      const getProductResponse = await this.productRepository.view(input.productId)

      if (!getProductResponse) return left(ProductNotFound)

      if (getProductResponse.sellerId !== input.sellerId)
        return left(ProductBelongsToAnotherUser)

      const updateProductResponse = await this.productRepository.update(input)

      if (!updateProductResponse) return left(ProductNotFound)

      return right(updateProductResponse)
    } catch (error) {
      console.log('UpdateProductUseCase::Error ', error)

      return left(ProductUpdateFailed)
    }
  }
}
