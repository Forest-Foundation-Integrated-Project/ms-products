import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputGetSignedUploadProductImageURL } from '../../3-controller/serializers/inputGetSignedUploadProductImageURL'
import { GetSignedUploadProductImageURLOperator } from '../../3-controller/operators/getSignedUploadProductImageURLOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {

  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(GetSignedUploadProductImageURLOperator)
  const body = event?.queryStringParameters as Object
  const payload = {
    ...body,
    ...(event?.requestContext?.authorizer?.userId && {
      userContextId: event.requestContext.authorizer.userId
    }),
  }

  const input = new InputGetSignedUploadProductImageURL(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})
