import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { buildLogger } from './common/logger'

const client = new DynamoDBClient({
  logger: console
});
const ddbDocClient = DynamoDBDocument.from(client);

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const internalClient = new DynamoDBClient({
    logger: console
  });
  const internalDdbDocClient = DynamoDBDocument.from(internalClient);

  const logger = buildLogger(event)

  logger.info('Booted lambda')

  logger.info({
    client: client.config,
    config: ddbDocClient
  })
  logger.info({
    client: internalClient.config,
    config: internalDdbDocClient
  })

  const awsConfig = Object.entries(process.env).filter(([key, ...rest]) => key.startsWith('AWS'))

  logger.info({
    env: awsConfig
  }, 'Global configuration')

  const item = await ddbDocClient.get({
    TableName: process.env.NOTES_TABLE_NAME,
    Key: {
      userId: 'example-user-id',
      noteId: 'example-note-id'
    }
  })

  logger.info('Performing put request')

  await ddbDocClient.put({
    TableName: process.env.NOTES_TABLE_NAME,
    Item: {
      userId: 'example-user-id',
      noteId: 'example-note-id',
      data: {
        exists: false
      }
    }
  })

  logger.info('This log line should not be visible')


  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  };
};
