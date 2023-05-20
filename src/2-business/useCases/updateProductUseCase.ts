import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { ProductNotFound, ProductUpdateFailed } from '../module/errors/products'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'
import { InputUpdateProductDto, OutputUpdateProductDto } from '../dto/productDto'

@injectable()
export class UpdateProductUseCase implements IUseCase<InputUpdateProductDto, OutputUpdateProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) {}

  async exec(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    try {
      const product = await this.productRepository.update({
        product_id: input.product_id,
        name: input.name,
        description: input.description,
        seller_id: input.seller_id,
        price_cents: input.price_cents,
        tag_id: input.tag_id
      })

      if (!product) return left (ProductNotFound)

      return right(product)
    } catch (error) {
      return left(ProductUpdateFailed)
    }
  }
}
