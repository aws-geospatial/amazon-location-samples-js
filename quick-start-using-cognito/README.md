# Quick start web app authenticating with Amazon Cognito

This example is a simple page that displays an interactive map and uses search functionality. [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/api/) and [Amazon Location
Service](https://aws.amazon.com/location) are used to build the app. Authentication to this app is done using [Amazon Cognito](https://aws.amazon.com/cognito/).

See the [quick start guide](https://docs.aws.amazon.com/location/latest/developerguide/getting-started.html) for a complete walkthrough of this example.

## Create resources

Click the button below to create the necessary AWS resources for this sample app to run. It will open the AWS Management Console and initiate the CloudFormation template deployment process.

[![Launch Stack](https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/cfn-launch-stack-button.svg)](https://console.aws.amazon.com/cloudformation/home?#/stacks/quickcreate?stackName=quick-start-using-cognito-example&templateURL=https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/samples/quick-start-using-cognito-example/template.yml)

Once the deployment process is complete, go to the `Outputs` section to get the Cognito Identity Pool ID, map resource name, and place index name.

## Configure

Open `main.js` and use the CloudFormation stack outputs to enter your Cognito Identity Pool ID, map resource name, place index name, and the region where the resources were created in.

## Run

Open `quickstart.html` in your browser.

## Clean up

If you would like to remove all of the resources created in this walkthrough, delete the CloudFormation stack called `quick-start-using-cognito-example`.

## Get help

- Have a bug to report? [Open an issue](https://github.com/aws-geospatial/amazon-location-samples-js/issues/new). If possible, include details about your development environment, and an example that shows the issue.

- Have an example request? [Open an issue](https://github.com/aws-geospatial/amazon-location-samples-js/issues/new). Tell us what the example should do and why you want it.

## Contribute

See [CONTRIBUTING](../CONTRIBUTING.md) for more information.

## Security

See [CONTRIBUTING](../CONTRIBUTING.md#security-issue-notifications) for more information.

## Licensing

This library is licensed under the MIT-0 License. See [LICENSE](../LICENSE).
