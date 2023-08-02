// AWS Resources
// Cognito:
const identityPoolId = "<Identity Pool ID>";

// Amazon Location Service:
const mapName = "js-quick-start-using-cognito";
const placesName = "<Places Resource Name>";
const region = "<Region>";

// Initialize a map
function initializeMap(authHelper) {
      // Initialize the map
      const mlglMap = new maplibregl.Map({
            container: "map", // HTML element ID of map element
            center: [-77.03674, 38.891602], // Initial map centerpoint
            zoom: 16, // Initial map zoom
            style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor`, // Defines the appearance of the map
            ...authHelper.getMapAuthenticationOptions(), // Provides options required to make requests to Amazon Location
      });

      // Add navigation control to the top left of the map
      mlglMap.addControl(new maplibregl.NavigationControl(), "top-left");

      return mlglMap;
}

async function main() {
      // Create an authentication helper instance using credentials from Cognito
      const authHelper = await amazonLocationAuthHelper.withIdentityPoolId(
            identityPoolId
      );

      // Initialize map and Amazon Location SDK client
      const map = await initializeMap(authHelper);
      const client = new amazonLocationClient.LocationClient({
            region,
            ...authHelper.getLocationClientConfig(), // Provides configuration required to make requests to Amazon Location
      });

      // Variable to hold marker that will be rendered on click
      let marker;

      // On mouse click, display marker and get results:
      map.on("click", async function (e) {
            // Remove any existing marker
            if (marker) {
                  marker.remove();
            }

            // Render a marker on clicked point
            marker = new maplibregl.Marker()
                  .setLngLat([e.lngLat.lng, e.lngLat.lat])
                  .addTo(map);

            // Set up parameters for search call
            let params = {
                  IndexName: placesName,
                  Position: [e.lngLat.lng, e.lngLat.lat],
                  Language: "en",
                  MaxResults: "5",
            };

            // Set up command to search for results around clicked point
            const command =
                  new amazonLocationClient.SearchPlaceIndexForPositionCommand(
                        params
                  );

            try {
                  // Make request to search for results around clicked point
                  const data = await client.send(command);

                  // Write JSON response data to HTML
                  document.querySelector("#response").textContent =
                        JSON.stringify(data, undefined, 2);

                  // Display place label in an alert box
                  alert(data.Results[0].Place.Label);
            } catch (error) {
                  // Write JSON response error to HTML
                  document.querySelector("#response").textContent =
                        JSON.stringify(error, undefined, 2);

                  // Display error in an alert box
                  alert("There was an error searching.");
            }
      });
}

main();
