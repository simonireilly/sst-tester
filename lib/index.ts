import MyStack from "./MyStack";
import * as sst from "@serverless-stack/resources";
import {Tracing} from '@aws-cdk/aws-lambda'

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x",
    tracing: Tracing.ACTIVE
  });

  new MyStack(app, "my-stack");

  // Add more stacks
}
