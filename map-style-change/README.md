# Switch map styles

This sample app shows you how to switch between different map styles. It uses Amazon Location Service's Maps as the base map provider and MapLibre GL JS as the map rendering library.

## Create resources

Click the button below to create the necessary AWS resources for this sample app to run. It will open the AWS Management Console and initiate the CloudFormation template deployment process.

<!-- TODO: templateUrl needs to be updated with the correct template -->

[![Launch Stack](https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/cfn-launch-stack-button.svg)](https://console.aws.amazon.com/cloudformation/home?#/stacks/quickcreate?stackName=map-style-change&templateURL=https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/samples/web-js-map-style-change/template.yml)

Once the deployment process is complete, go to the `Outputs` to view ApiKey and Region.

In the stack output's tab only the ApiKey name is visible, in order to get the ApiKey value:
- Navigate to Amazon Location Service
- Click on "API keys" from the left navigation pane
- Click on the ApiKey name
- Copy the ApiKey value

## Configure

Open `index.html` and use the values gathered from above to populate apiKey and region.

## Run

Open `index.html` in your browser.

## Clean up

If you would like to remove all of the resources created in this walkthrough, 
delete the CloudFormation stack called `map-style-change`. Then, to clean up the API Key:
- Navigate to Amazon Location Service
- Click on "API keys" from the left navigation pane
- Click on the ApiKey `js-map-style-change`
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
