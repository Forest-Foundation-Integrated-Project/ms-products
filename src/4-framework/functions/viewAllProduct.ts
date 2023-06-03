import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { httpHandler } from '../utility/httpHandler'
import { httpResponse } from '../utility/httpResponse'
import { container } from '../shared/ioc/container'
import { ViewAllProductOperator } from '../../3-controller/operators/viewAllProductOperator'
import { InputViewAllProduct } from '../../3-controller/serializers/inputViewAllProduct'
import EOrder from '../shared/enums/EOrder'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {

  const { queryStringParameters: queryParams } = event;

  context.callbackWaitsForEmptyEventLoop = false
    const operator = container.get(ViewAllProductOperator)

    const params = {
      name: queryParams?.name,
      createdAt: queryParams?.createdAt,
      price_cents: queryParams?.price_cents,
      per_page: queryParams?.per_page,
      page: queryParams?.page
    }

    const input = new InputViewAllProduct(params)
    const result = await operator.exec(input)

    if (result.isLeft()) {
      return httpResponse.badRequest(result.value)
    }
  return httpResponse.ok(result)
})
