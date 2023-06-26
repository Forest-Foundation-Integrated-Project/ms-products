import { injectable, inject } from 'inversify'

import { ProductBelongsToAnotherUser, ProductNotFound, SignedURLGenerationFailed } from '../module/errors/products'
import { IProductRepository, IProductRepositoryToken } from '../repositories/iProductRepository'
import { UserIdentityCannotBeValidated } from '../module/errors/users'
import { IStorageService, IStorageServiceToken } from '../services/iStorageService'
import { InputGetSignedUploadProductImageURLDto, OutputGetSignedUploadProductImageURLDto } from '../dto/getSignedUploadProductImageURLDto'
import { left, right } from '../../4-framework/shared/either'
import { IUseCase } from './iUseCase'

@injectable()
export class GetSignedUploadProductImageURLUseCase implements IUseCase<InputGetSignedUploadProductImageURLDto, OutputGetSignedUploadProductImageURLDto> {
  public constructor(
    @inject(IProductRepositoryToken) private productRepository: IProductRepository,
    @inject(IStorageServiceToken) private storageService: IStorageService
  ) { }

  async exec(input: InputGetSignedUploadProductImageURLDto): Promise<OutputGetSignedUploadProductImageURLDto> {
    try {
      if (input.sellerId !== input.userContextId) {
        return left(UserIdentityCannotBeValidated)
      }

      const productResponse = await this.productRepository.view(input.productId)

      if (!productResponse.productId) {
        return left(ProductNotFound)
      }

      if (productResponse.sellerId !== input.sellerId) {
        return left(ProductBelongsToAnotherUser)
      }

      const getSignedURLResponse = await this.storageService.getSignedURL(input)

      if (getSignedURLResponse.isLeft()) {
        return left(SignedURLGenerationFailed)
      }

      return right(getSignedURLResponse.value)
    } catch (error) {
      console.log('GetSignedUploadProductImageURLUseCase::Error => ', error)

      return left(SignedURLGenerationFailed)
    }
  }
}
