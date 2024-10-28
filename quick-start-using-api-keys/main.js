// Amazon Location Service:
const apiKey = "<YOUR_AWS_API_KEY>";
const region = "<YOUR_AWS_REGION>";

// Initialize a map
async function initializeMap() {
  // Initialize the map
  const mlglMap = new maplibregl.Map({
    container: "map", // HTML element ID of map element
    center: [-77.03674, 38.891602], // Initial map centerpoint
    zoom: 16, // Initial map zoom
    style: `https://maps.geo.${region}.amazonaws.com/v2/styles/Standard/descriptor?key=${apiKey}`, // Defines the appearance of the map and authenticates using an API key
  });

  // Add navigation control to the top left of the map
  mlglMap.addControl(new maplibregl.NavigationControl(), "top-left");

  return mlglMap;
}

async function main() {
  // Create an authentication helper instance using an API key
  const authHelper = await amazonLocationAuthHelper.withAPIKey(apiKey);

  // Initialize map and GeoPlaces client from Amazon Location SDK
  const map = await initializeMap();
  const client = new amazonLocationClient.places.GeoPlacesClient({
    region,
    endpoint: `https://places.geo.${region}.amazonaws.com/v2`, // FIXME
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
    marker = new maplibregl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);

    // Set up parameters for search call
    const params = {
      QueryPosition: [e.lngLat.lng, e.lngLat.lat],
      Language: "en",
      MaxResults: "5",
    };

    // Set up command to search for results around clicked point
    const command = new amazonLocationClient.places.ReverseGeocodeCommand(params);

    try {
      // Make request to search for results around clicked point
      const data = await client.send(command);

      // Write JSON response data to HTML
      document.querySelector("#response").textContent = JSON.stringify(data, undefined, 2);
    } catch (error) {
      // Write JSON response error to HTML
      document.querySelector("#response").textContent = JSON.stringify(error, undefined, 2);

      // Display error in an alert box
      alert("There was an error searching.");
    }
  });
}

main();
