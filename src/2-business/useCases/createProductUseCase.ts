import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputCreateProductDto, OutputCreateProductDto } from '../dto/productDto'
import { ProductCreationFailed } from '../module/errors/products'
import { ProductEntity } from '../../1-domain/entities/productEntity'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'
import { UserIdentityCannotBeValidated } from '../module/errors/users'

@injectable()
export class CreateProductUseCase implements IUseCase<InputCreateProductDto, OutputCreateProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) {}

  async exec(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    try {
      const productResult = ProductEntity.create(input)

      if (input.sellerId !== input.userContextId) {
        return left(UserIdentityCannotBeValidated)
      }


      if (productResult.isLeft()) {
        return left(ProductCreationFailed)
      }

      const product = await this.productRepository.create(productResult.value.export())
      console.log('CreateProductUseCase::product ? ', product)
      return right(product)
    } catch (error) {
      console.log('CreateProductUseCase::Error => ', error)

      return left(ProductCreationFailed)
    }
  }
}
