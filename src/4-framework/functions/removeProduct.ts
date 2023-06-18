import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputRemoveProduct } from '../../3-controller/serializers/inputRemoveProduct'
import { RemoveProductOperator } from '../../3-controller/operators/removeProductOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(RemoveProductOperator)
  const body = JSON.parse(event?.body as string)
  const payload = {
    ...body,
    ...(event?.requestContext?.authorizer?.userId && {
      userContextId: event.requestContext.authorizer.userId
    }),
  }

  const input = new InputRemoveProduct(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})
