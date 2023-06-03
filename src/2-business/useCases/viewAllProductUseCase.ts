import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputViewAllProductDto, OutputViewAllProductDto } from '../dto/productDto'
import { ProductViewingFailed } from '../module/errors/products'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'

@injectable()
export class ViewAllProductUseCase implements IUseCase<InputViewAllProductDto, OutputViewAllProductDto> {
  public constructor(@inject(IProductRepositoryToken) private productRepository: IProductRepository) {}

  async exec(input?: InputViewAllProductDto): Promise<OutputViewAllProductDto> {
    try {
<<<<<<< HEAD
      const product = await this.productRepository.viewAll(input?.name, input?.createdAt);
=======
      const product = await this.productRepository.viewAll(input?.name);
>>>>>>> 3ff0e94 (feat: add search by name)

      return right(product);
    } catch (error) {
      return left(ProductViewingFailed)
    }
  }
}
