import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const AWS = require('aws-sdk');

import { injectable } from 'inversify'
const { v4: uuidv4 } = require('uuid')

import { IGetImagesUrl, IGetSignedURL, IStorageService } from '../../2-business/services/iStorageService'
import { ISignedUrlResponse } from '../../2-business/dto/getSignedUploadProductImageURLDto'
import { FailedToGenerateUrlOfProductImages, SignedURLGenerationServiceFailed } from '../../2-business/module/errors/products'
import { Either, left, right } from '../shared/either'
import { IError } from '../shared/iError'


@injectable()
export class StorageService implements IStorageService {
  async getSignedURL(props: IGetSignedURL): Promise<Either<IError, ISignedUrlResponse>> {
    const s3 = new S3Client({ region: process.env.REGION })

    try {
      const ACL = 'public-read'
      const actionId = uuidv4()
      const fileExtension = '.jpg'
      const fileName = `${props.sellerId}/${props.productId}/${Date.now()}-image-${actionId}${fileExtension}`

      const s3Params = {
        Bucket: process.env.IMAGES_BUCKET_NAME,
        Key: fileName,
        ContentType: 'image/jpeg',
        ACL
      }
      const command = new PutObjectCommand(s3Params)
      const signedUrlResponse = await getSignedUrl(s3, command, { expiresIn: 60 })

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
    const s3 = new AWS.S3();
    const baseUrl = 'https://products-images-dev.s3.amazonaws.com'

    try {
      const s3Params = {
        Bucket: process.env.IMAGES_BUCKET_NAME,
        Prefix: `${props.sellerId}/${props.productId}`,
      }
      console.log('s3Params ', s3Params)
      const response = await s3.listObjects(s3Params).promise()
      console.log('response ', response)
      const imagesUrl = response.Contents?.map((file: any) => `${baseUrl}/${file.Key}`) || []

      return right(imagesUrl)
    } catch (error) {
      console.log('StorageService::GetFiles => ', error)
      return left(FailedToGenerateUrlOfProductImages)
    }
  }
}
