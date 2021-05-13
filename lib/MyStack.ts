import * as sst from "@serverless-stack/resources";
import { Table, TableFieldType } from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a table
    const notesTable = new Table(this, "Notes", {
      fields: {
        userId: TableFieldType.STRING,
        noteId: TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "noteId", sortKey: "userId" },
    });

    // Create the HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda.handler",
      },
      defaultFunctionProps: {
        permissions: [[notesTable.dynamodbTable, "grantReadData"]],
        environment: {
          NOTES_TABLE_NAME: notesTable.dynamodbTable.tableName
        }
      }
    });

    // Show API endpoint in output
    this.addOutputs({
      "ApiEndpoint": api.url,
    });
  }
}
