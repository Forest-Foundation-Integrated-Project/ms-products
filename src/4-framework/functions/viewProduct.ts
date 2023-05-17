import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { InputViewProduct } from '../../3-controller/serializers/inputViewProduct'
import { ViewProductOperator } from '../../3-controller/operators/viewProductOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {

  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ViewProductOperator)
  const body = event?.pathParameters as Object

  const input = new InputViewProduct(body)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})
