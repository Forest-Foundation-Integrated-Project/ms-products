import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { httpHandler } from '../utility/httpHandler'
import { httpResponse } from '../utility/httpResponse'
import { container } from '../shared/ioc/container'
import { ViewAllProductOperator } from '../../3-controller/operators/viewAllProductOperator'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {

  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ViewAllProductOperator)
    const result = await operator.exec()
  
    if (result.isLeft()) {
      return httpResponse.badRequest(result.value)
    }
  return httpResponse.ok(result)
})
