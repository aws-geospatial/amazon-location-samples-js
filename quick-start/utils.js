/**
 * It will be used by Maplibre Geocode.
 */
class GeoPlaces {
    /**
     * Creates an instance of GeoPlaces.
     * @param {string} awsRegion - The AWS region for API requests.
     * @param {string} apiKey - The API key for authentication.
     */
    constructor(client,map) { 
        this.client = client;
        this.map = map;
    }

    /**
     * Method for forward geocoding.
     * @param {Object} config - The configuration for the geocoding request.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the geocoded features.
     */
    async forwardGeocode(config) {
        const center = this.map.getCenter(); // Get the center of the map
        const request = {
                            QueryText: config.query, // Text to search for
                            BiasPosition: [center.lng, center.lat], // Bias position based on map center
                            Language: "en" // Language for the request
                        };
        const command = new amazonLocationClient.places.SearchTextCommand(request);
        const response = await this.client.send(command);
        return {
            features: response?.ResultItems.map(result => this.convertResultToViewObject(result)) || [], // Use arrow function to retain context
        };
    }

    /**
     * Method for reverse geocoding.
     * @param {Object} config - The configuration for the reverse geocoding or reverse search request.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the geocoded features.
     */
    async reverseGeocode(config) {
        const limit = config.click ? 1 : 15; // Set result limit based on click
        const query = config.query; // Get query from config
        const request = {
            QueryPosition: query, // Position for query
            MaxResults: limit, // Maximum results to return
            Language: "en" // Language for the request
        };
        const command = config.click ? 
                                    new amazonLocationClient.places.ReverseGeocodeCommand(request): 
                                    new amazonLocationClient.places.SearchNearbyCommand(request); // Choose Caommand based on click
        const response = await this.client.send(command);
        return {
            features: response?.ResultItems.map(result => this.convertResultToViewObject(result)) || [], // Use arrow function to retain context
        };
    }

    /**
     * Method for getting suggestions based on a query.
     * @param {Object} config - The configuration for the suggestion request.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the suggestion features.
     */
    async getSuggestions(config) {
        const center = this.map.getCenter(); // Get the center of the map
        const request = {
                            QueryText: config.query, // Text to get suggestions for
                            BiasPosition: [center.lng, center.lat], // Bias position based on map center
                            AdditionalFeatures: ["Core"], // Additional features for the request
                            Language: "en" // Language for the request
                       };
        const command = new amazonLocationClient.places.SuggestCommand(request);
        const response = await this.client.send(command);
        return {
            features: response?.ResultItems.map(result => {
                // Transform results based on their type
                return this.convertResultToViewObject(result.SuggestResultItemType === "Place" ? result.Place : result);
            }) || [] // Return transformed results or empty array
        };
    }

    /**
     * Method for searching by place ID.
     * @param {string} placeId - The place ID to search for.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the place details.
     */
    async searchByPlaceId(placeId) {
        const request = {
            Language: "en", // Language for the request 
            PlaceId:placeId
        };
        const command = new amazonLocationClient.places.GetPlaceCommand(request);
        const response = await this.client.send(command);
        return { features: response ? [this.convertResultToViewObject(response)] : [] }; // Return transformed response or empty array
    }

    /**
     * Transform data to visualize on map.
     * @param {Object} result - The result object to transform.
     * @returns {Object} - The transformed view object.
     */
    convertResultToViewObject(result) {
        return result.SuggestResultItemType === "Query"
            ? this.convertQueryToViewObject(result)
            : this.convertPlaceToViewObject(result);
    }

    /**
     * Helper function for transforming query results.
     * @param {Object} result - The query result to transform.
     * @returns {Object} - The transformed query view object.
     */
    convertQueryToViewObject(result) {
        return {
            geometry: { type: "NA", coordinates: [] }, // Geometry for query type with empty coordinates
            result_type: "Query", // Result Type
            place_name: result.Title || "", // Title of the query or empty string
            properties: result.Query || "", // Properties of the query or empty string
            place_type: result.Query?.QueryType || "", // Type of the query or empty string
            id: result.Query?.QueryId || "" // ID of the query or empty string
        };
    }

    /**
     * Helper function for transforming place results.
     * @param {Object} result - The place result to transform.
     * @returns {Object} - The transformed place view object.
     */
    convertPlaceToViewObject(result) {
        return {
            center: result.Position || [], // Center position or empty array
            result_type: "Place", // Result Type
            geometry: { 
                type: "point", // Geometry type for the place
                coordinates: result.Position || [] // Coordinates of the place or empty array
            },
            id: result.PlaceId || "", // Place ID or empty string
            text: result.Title,
            place_name: result.Address?.Label || "", // Address label or empty string
            place_type: result.PlaceType || "", // Type of the place or empty string
            properties: result // Original result object as properties
        };
    }
}

window.GeoPlaces = GeoPlaces;



