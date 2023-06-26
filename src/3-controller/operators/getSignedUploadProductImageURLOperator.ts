import { injectable, inject } from 'inversify'

import { left, right } from '../../4-framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { InputGetSignedUploadProductImageURL, OutputGetSignedUploadProductImageURL } from '../serializers/inputGetSignedUploadProductImageURL'
import { GetSignedUploadProductImageURLUseCase } from '../../2-business/useCases/getSignedUploadProductImageURLUseCase'

@injectable()
export class GetSignedUploadProductImageURLOperator extends AbstractOperator<InputGetSignedUploadProductImageURL, OutputGetSignedUploadProductImageURL> {
  public constructor(@inject(GetSignedUploadProductImageURLUseCase) private getSignedUploadProductImageURLUseCase: GetSignedUploadProductImageURLUseCase) {
    super()
  }

  protected async run(input: InputGetSignedUploadProductImageURL): Promise<OutputGetSignedUploadProductImageURL> {
    const result = await this.getSignedUploadProductImageURLUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
