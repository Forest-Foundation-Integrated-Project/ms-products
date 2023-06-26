import AWS from 'aws-sdk'
import { injectable } from 'inversify'
const { v4: uuidv4 } = require('uuid');

import { IGetImagesUrl, IGetSignedURL, IStorageService } from '../../2-business/services/iStorageService'
import { ISignedUrlResponse } from '../../2-business/dto/getSignedUploadProductImageURLDto'
import { FailedToGenerateUrlOfProductImages, SignedURLGenerationServiceFailed } from '../../2-business/module/errors/products'
import { Either, left, right } from '../shared/either'
import { IError } from '../shared/iError'

interface IContentProps {
  Key: string
}

@injectable()
export class StorageService implements IStorageService {
  async getSignedURL(props: IGetSignedURL): Promise<Either<IError, ISignedUrlResponse>> {
    const s3 = new AWS.S3()
    try {

      const ACL = 'public-read'
      const actionId = uuidv4()
      const expires = 60
      const fileExtension = '.jpg'
      const fileName = `${Date.now()}-image-${actionId}${fileExtension}`

      const s3Params = {
        Bucket: `${process.env.IMAGES_BUCKET_NAME}/${props.sellerId}/${props.productId}`,
        Key: fileName,
        ContentType: 'image/jpeg',
        Expires: expires,
        ACL
      };

      const signedUrlResponse = await s3.getSignedUrl('putObject', s3Params)

      return right({
        url: signedUrlResponse,
        fileName
      })
    } catch (error) {
      console.log('StorageService::GetSignedURL => ', error)
      return left(SignedURLGenerationServiceFailed)
    }
  }

  async getImagesUrl(props: IGetImagesUrl): Promise<Either<IError, string[]>> {
    const s3 = new AWS.S3()
    const baseUrl = 'https://products-images-dev.s3.amazonaws.com'

    try {
      const s3Params = {
        Bucket: process.env.IMAGES_BUCKET_NAME,
        Prefix: `${props.sellerId}/${props.productId}`,
      };

      const response = await s3.listObjects(s3Params).promise();
      const imagesUrl = response.Contents.map((file: IContentProps) => `${baseUrl}/${file.Key}`);

      return right(imagesUrl)
    } catch (error) {
      console.log('StorageService::GetFiles => ', error)
      return left(FailedToGenerateUrlOfProductImages)
    }
  }
}
