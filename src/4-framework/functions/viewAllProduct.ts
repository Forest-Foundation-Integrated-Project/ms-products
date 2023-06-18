import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { ViewAllProductOperator } from '../../3-controller/operators/viewAllProductOperator'
import { InputViewAllProduct } from '../../3-controller/serializers/inputViewAllProduct'
import { httpHandler } from '../utility/httpHandler'
import { httpResponse } from '../utility/httpResponse'
import { container } from '../shared/ioc/container'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ViewAllProductOperator)
  const payload = {
    ...event.queryStringParameters,
    ...(event.queryStringParameters?.limit && {
      limit: Number(event.queryStringParameters.limit)
    }),
  }

  const input = new InputViewAllProduct(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }
  return httpResponse.ok(result)
})
