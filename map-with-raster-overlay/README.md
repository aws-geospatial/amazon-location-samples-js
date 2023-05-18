# Display a raster layer on a webpage

This sample app shows you how to display a map with a raster layer on a webpage. It uses Amazon Location Service's Maps as the base map provider, MapLibre GL JS as the map rendering library, and uses the Iowa Environmental Mesonet Map Tile APIs to display a raster layer of weather data.

## Create resources

Click the button below to create the necessary AWS resources for this sample app to run. It will open the AWS Management Console and initiate the CloudFormation template deployment process.

[![Launch Stack](https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/cfn-launch-stack-button.svg)](https://console.aws.amazon.com/cloudformation/home?#/stacks/quickcreate?stackName=map-with-raster-overlay-example&templateURL=https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/samples/web-raster-overlay/template.yml)

Once the deployment process is complete, go to the `Outputs` section to get the Cognito Identity Pool ID.

## Configure 

Open `index.html` and use the CloudFormation stack outputs to enter your Cognito Identity Pool ID.

By default this map is centered on Birmingham, AL and uses the `BMX` radar. To change the radar site, radar product, or view archived radar imagery, see the [IEM Docs](https://mesonet.agron.iastate.edu/GIS/ridge.phtml)
## Run

Open `index.html` in your browser.

![Global Temperature Image](https://amazon-location-cloudformation-templates.s3.us-west-2.amazonaws.com/samples/web-raster-overlay/map-with-raster-overlay.png)
## Clean up

If you would like to remove all of the resources created in this walkthrough, delete the CloudFormation stack called `map-with-raster-overlay-example`.

## Get help

- Have a bug to report? [Open an issue](https://github.com/aws-geospatial/amazon-location-samples-js/issues/new). If possible, include details about your development environment, and an example that shows the issue.

- Have an example request? [Open an issue](https://github.com/aws-geospatial/amazon-location-samples-js/issues/new). Tell us what the example should do and why you want it.

## Contribute

See [CONTRIBUTING](../CONTRIBUTING.md) for more information.

## Security

See [CONTRIBUTING](../CONTRIBUTING.md#security-issue-notifications) for more information.

## Licensing

This library is licensed under the MIT-0 License. See [LICENSE](../LICENSE).
