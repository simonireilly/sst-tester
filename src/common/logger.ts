import { APIGatewayProxyEventV2 } from 'aws-lambda'
import pino, { Logger } from 'pino'

export const buildLogger = (event: APIGatewayProxyEventV2): Logger => {
  return pino({
    name: 'LambdaLogger',
    prettyPrint: true
  }).child({
    requestId: event.requestContext.requestId
  })
}
