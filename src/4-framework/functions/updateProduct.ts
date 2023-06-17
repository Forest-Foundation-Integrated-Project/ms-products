import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputUpdateProduct } from '../../3-controller/serializers/inputUpdateProduct'
import { UpdateProductOperator } from '../../3-controller/operators/updateProductOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(UpdateProductOperator)
  const body = JSON.parse(event?.body as string)
  const payload = {
    ...body,
    ...(event?.requestContext?.authorizer?.userId && {
      userContextId: event.requestContext.authorizer.userId
    }),
  }
  const input = new InputUpdateProduct(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})
