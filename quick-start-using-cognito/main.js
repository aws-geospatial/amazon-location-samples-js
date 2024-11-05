// AWS Resources
// Cognito:
const identityPoolId = "<Identity Pool ID>";

// Determine the region from the prefix on the Cognito Identity Pool ID
const region = identityPoolId.split(":")[0];

// Initialize a map
function initializeMap(authHelper) {
  // Initialize the map
  const map = new maplibregl.Map({
    container: "map", // HTML element ID of map element
    center: [-77.03674, 38.891602], // Initial map centerpoint
    zoom: 16, // Initial map zoom
    style: `https://maps.geo.${region}.amazonaws.com/v2/styles/Standard/descriptor`, // Defines the appearance of the map
    validateStyle: false, // Disable style validation for faster map load
    ...authHelper.getMapAuthenticationOptions(), // Provides options required to make map requests when using Amazon Cognito
  });

  // Add navigation control to the top left of the map
  map.addControl(new maplibregl.NavigationControl(), "top-left");

  return map;
}

async function main() {
  // Create an authentication helper instance using credentials from Cognito
  const authHelper = await amazonLocationClient.withIdentityPoolId(
    identityPoolId
  );

  // Initialize map and Amazon Location SDK client
  const map = await initializeMap(authHelper);
  const client = new amazonLocationClient.GeoPlacesClient(
    authHelper.getClientConfig()
  );

  // Variable to hold marker that will be rendered on click
  let marker;

  // On mouse click, display marker and get results:
  map.on("click", async function (e) {
    // Remove any existing marker
    if (marker) {
      marker.remove();
    }

    // Render a marker on clicked point
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    marker = new maplibregl.Marker().setLngLat([lng, lat]).addTo(map);

    // Set up the input for the reverse geocode call
    const input = {
      QueryPosition: [lng, lat],
      Language: "en",
      MaxResults: "5",
    };

    // Set up command to search for results around clicked point
    const command = new amazonLocationClient.places.ReverseGeocodeCommand(
      input
    );

    try {
      // Make request to search for results around clicked point
      const data = await client.send(command);

      // Write JSON response data to HTML
      document.querySelector("#response").textContent = JSON.stringify(
        data,
        undefined,
        2
      );

      // Display place label in an alert box
      alert(data.ResultItems[0].Address.Label);
    } catch (error) {
      // Write JSON response error to HTML
      document.querySelector("#response").textContent = JSON.stringify(
        error,
        undefined,
        2
      );

      // Display error in an alert box
      alert("There was an error searching.");
    }
  });
}

main();
