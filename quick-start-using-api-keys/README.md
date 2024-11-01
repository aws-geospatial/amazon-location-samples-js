# Quick start web app authenticating with API keys

This example is a simple page that displays an interactive map and uses search functionality. [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/api/) and [Amazon Location
Service](https://aws.amazon.com/location) are used to build the app. Authentication to this app is done using Amazon Location [API keys](https://docs.aws.amazon.com/location/latest/developerguide/using-apikeys.html).

See the [quick start guide](https://docs.aws.amazon.com/location/latest/developerguide/getting-started.html) for a complete walkthrough of this example.

## Create resources

Create Amazon Location resources for the app by following [these steps](https://docs.aws.amazon.com/location/latest/developerguide/getting-started.html#qs-create-resources).

You can also click the button below to create the necessary AWS resources for this sample app to run. It will open the AWS Management Console and initiate the CloudFormation template deployment process.

<!-- TODO: templateUrl needs to be updated with the correct template -->

[![Launch Stack](https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/cfn-launch-stack-button.svg)](https://console.aws.amazon.com/cloudformation/home?#/stacks/quickcreate?stackName=quick-start-using-api-keys&templateURL=https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/samples/web-quick-start-using-api-keys/template.yml)

Once the deployment process is complete, go to the `Outputs` to view ApiKey and Region.

- In the stack output's tab only the ApiKey name is visible, in order to get the ApiKey value
- Navigate to Amazon Location Service
- Click on "API keys" from the left navigation pane
- Click on the ApiKey name
- Copy the ApiKey value

## Configure

Open `main.js` and enter the API key and the region where the resources were created in.

## Run

Open `quickstart.html` in your browser.

## Clean up

If you would like to remove all of the resources created in this walkthrough,
delete the CloudFormation stack called `quick-start-using-api-keys`. Then, to clean up the API Key:

- Navigate to Amazon Location Service
- Click on "API keys" from the left navigation pane
- Click on the ApiKey `js-quick-start-using-api-keys`
- Press Delete

## Get help

- Have a bug to report? [Open an issue](https://github.com/aws-geospatial/amazon-location-samples-js/issues/new). If possible, include details about your development environment, and an example that shows the issue.

- Have an example request? [Open an issue](https://github.com/aws-geospatial/amazon-location-samples-js/issues/new). Tell us what the example should do and why you want it.

## Contribute

See [CONTRIBUTING](../CONTRIBUTING.md) for more information.

## Security

See [CONTRIBUTING](../CONTRIBUTING.md#security-issue-notifications) for more information.

## Licensing

This library is licensed under the MIT-0 License. See [LICENSE](../LICENSE).
