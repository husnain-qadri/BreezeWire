/**
 * BreezeWire Backend Server
 * 
 * A Node.js/Express server that provides weather data, location services,
 * and favorites management for the weather application frontend.
 * 
 * Features:
 * - Weather data from Tomorrow.io API
 * - Google Maps geocoding and reverse geocoding
 * - IP-based location detection
 * - MongoDB favorites storage
 * - CORS-enabled REST API
 * 
 * @author Assignment 3 - Weather App
 * @version 1.0.0
 */

const express = require('express');
const cors = require('cors');
const { Client } = require('@googlemaps/google-maps-services-js');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const IPinfoWrapper = require("node-ipinfo");
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Maps client
const gmaps = new Client({});

// MongoDB configuration
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://husnainqadri791:fXZJbhJHjgjibnwj@cluster0.ixxlxaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoClient = new MongoClient(MONGO_URI);
let db, favouritesCollection;

/**
 * Establishes connection to MongoDB database
 * @returns {Promise<void>}
 */
async function connectToMongo() {
    try {
        await mongoClient.connect();
        db = mongoClient.db("csci571hw3");
        favouritesCollection = db.collection("favourites");
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ Could not connect to MongoDB:", error.message);
        process.exit(1);
    }
}

/**
 * Validates required query parameters
 * @param {Object} queryParams - Request query parameters
 * @param {Array} requiredParams - Array of required parameter names
 * @returns {Object} Validation result with isValid and missing fields
 */
function validateQueryParams(queryParams, requiredParams) {
    const missing = requiredParams.filter(param => !queryParams[param]);
    return {
        isValid: missing.length === 0,
        missing
    };
}

/**
 * Error handler middleware
 * @param {Error} error - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
function errorHandler(error, req, res, next) {
    console.error(`❌ Error in ${req.method} ${req.path}:`, error.message);
    res.status(500).json({
        error: "Internal server error",
        message: error.message
    });
}

// =============================================================================
// GEOCODING & LOCATION ENDPOINTS
// =============================================================================

/**
 * GET /geoencode
 * Converts street address to geographic coordinates using Google Maps Geocoding API
 * 
 * Query Parameters:
 * @param {string} street - Street address
 * @param {string} city - City name
 * @param {string} state - State name
 * 
 * @returns {Object} Geocoding results with coordinates and formatted address
 */
app.get("/geoencode", async (req, res) => {
    try {
        const { street, city, state } = req.query;

        // Validate required parameters
        const validation = validateQueryParams(req.query, ['street', 'city', 'state']);
        if (!validation.isValid) {
            return res.status(400).json({
                error: "Missing required parameters",
                missing: validation.missing
            });
        }

        const response = await gmaps.geocode({
            params: {
                address: `${street}, ${city}, ${state}`,
                key: process.env.GOOGLE_API
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Geocoding error:", error.message);
        res.status(500).json({
            error: "Failed to geocode address",
            message: error.message
        });
    }
});

/**
 * GET /reverseGeoencode
 * Converts geographic coordinates to street address using Google Maps Reverse Geocoding API
 * 
 * Query Parameters:
 * @param {string} latitude - Latitude coordinate
 * @param {string} longitude - Longitude coordinate
 * 
 * @returns {Object} Reverse geocoding results with formatted address
 */
app.get("/reverseGeoencode", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validate required parameters
        const validation = validateQueryParams(req.query, ['latitude', 'longitude']);
        if (!validation.isValid) {
            return res.status(400).json({
                error: "Missing required parameters",
                missing: validation.missing
            });
        }

        const response = await gmaps.reverseGeocode({
            params: {
                latlng: `${latitude},${longitude}`,
                key: process.env.GOOGLE_API
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Reverse geocoding error:", error.message);
        res.status(500).json({
            error: "Failed to reverse geocode coordinates",
            message: error.message
        });
    }
});

/**
 * GET /autoDetectLocation
 * Automatically detects user's location based on IP address using IPinfo API
 * 
 * @returns {string} Location coordinates in "lat,lng" format or error message
 */
app.get("/autoDetectLocation", async (req, res) => {
    try {
        const ipinfo = new IPinfoWrapper.IPinfoWrapper(process.env.IPINFO);
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;

        const response = await ipinfo.lookupIp(clientIp);

        if (response.loc) {
            res.json(response.loc);
        } else {
            res.status(404).json({
                error: "Location not found",
                message: "No location information available for this IP address"
            });
        }
    } catch (error) {
        console.error("IP location detection error:", error.message);
        res.status(500).json({
            error: "Failed to detect location",
            message: error.message
        });
    }
});

// =============================================================================
// WEATHER DATA ENDPOINTS
// =============================================================================

/**
 * GET /getWeatherData
 * Fetches comprehensive weather data from Tomorrow.io API
 * 
 * Query Parameters:
 * @param {string} latitude - Latitude coordinate
 * @param {string} longitude - Longitude coordinate
 * @param {string} timesteps - Time intervals (1d, 1h, etc.)
 * 
 * @returns {Object} Weather data including current conditions and forecasts
 */
app.get("/getWeatherData", async (req, res) => {
    try {
        const { latitude, longitude, timesteps } = req.query;

        // Validate required parameters
        const validation = validateQueryParams(req.query, ['latitude', 'longitude', 'timesteps']);
        if (!validation.isValid) {
            return res.status(400).json({
                error: "Missing required parameters",
                missing: validation.missing
            });
        }

        const startTime = "now";
        const endTime = "nowPlus5d";
        const apiKey = process.env.TOMORROW_API;

        const weatherFields = [
            'temperature', 'temperatureApparent', 'temperatureMin', 'temperatureMax',
            'windSpeed', 'windDirection', 'humidity', 'pressureSeaLevel', 'uvIndex',
            'weatherCode', 'precipitationProbability', 'precipitationType',
            'sunriseTime', 'sunsetTime', 'visibility', 'moonPhase', 'cloudCover'
        ].join('%2C');

        const apiUrl = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=${weatherFields}&units=imperial&timesteps=${timesteps}&startTime=${startTime}&endTime=${endTime}&apikey=${apiKey}`;

        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error("Weather data fetch error:", error.message);
        res.status(500).json({
            error: "Failed to fetch weather data",
            message: error.message
        });
    }
});

/**
 * GET /getTimelineData
 * Fetches hourly weather timeline data for charts and detailed analysis
 * 
 * Query Parameters:
 * @param {string} latitude - Latitude coordinate
 * @param {string} longitude - Longitude coordinate
 * 
 * @returns {Object} Hourly weather timeline data for 5 days
 */
app.get("/getTimelineData", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validate required parameters
        const validation = validateQueryParams(req.query, ['latitude', 'longitude']);
        if (!validation.isValid) {
            return res.status(400).json({
                error: "Missing required parameters",
                missing: validation.missing
            });
        }

        const timesteps = "1h";
        const startTime = "now";
        const endTime = "nowPlus5d";
        const apiKey = process.env.TOMORROW_API;

        const apiUrl = `https://api.tomorrow.io/v4/timelines?apikey=${apiKey}`;

        const payload = {
            location: `${latitude},${longitude}`,
            fields: ["temperature", "humidity", "pressureSeaLevel", "windDirection", "windSpeed"],
            units: "imperial",
            timesteps: [timesteps],
            startTime: startTime,
            endTime: endTime,
        };

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Timeline data fetch error:", error.message);
        res.status(500).json({
            error: "Failed to fetch timeline data",
            message: error.message
        });
    }
});

// =============================================================================
// FAVORITES MANAGEMENT ENDPOINTS
// =============================================================================

/**
 * POST /storeLocation
 * Stores a location in the user's favorites list
 * 
 * Request Body:
 * @param {string} city - City name
 * @param {string} state - State name
 * 
 * @returns {Object} Success message and insertion ID or existing location message
 */
app.post("/storeLocation", async (req, res) => {
    try {
        const { city, state } = req.body;

        // Validate required fields
        if (!city || !state) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["city", "state"]
            });
        }

        const existingLocation = await favouritesCollection.findOne({ city, state });

        if (existingLocation) {
            return res.status(200).json({
                message: "Location already exists in favorites",
                exists: true
            });
        }

        const result = await favouritesCollection.insertOne({
            city,
            state,
            createdAt: new Date()
        });

        res.status(201).json({
            message: "Location stored successfully!",
            id: result.insertedId,
            exists: false
        });
    } catch (error) {
        console.error("Store location error:", error.message);
        res.status(500).json({
            error: "Failed to store location",
            message: error.message
        });
    }
});

/**
 * GET /retrieveLocations
 * Retrieves all stored favorite locations
 * 
 * @returns {Array} Array of favorite locations (city, state)
 */
app.get("/retrieveLocations", async (req, res) => {
    try {
        const locations = await favouritesCollection
            .find({}, { projection: { _id: 0, city: 1, state: 1 } })
            .toArray();

        res.json(locations);
    } catch (error) {
        console.error("Retrieve locations error:", error.message);
        res.status(500).json({
            error: "Failed to retrieve locations",
            message: error.message
        });
    }
});

/**
 * DELETE /deleteLocation
 * Removes a location from the user's favorites list
 * 
 * Request Body:
 * @param {string} city - City name
 * @param {string} state - State name
 * 
 * @returns {Object} Success or error message
 */
app.delete("/deleteLocation", async (req, res) => {
    try {
        const { city, state } = req.body;

        // Validate required fields
        if (!city || !state) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["city", "state"]
            });
        }

        const result = await favouritesCollection.deleteOne({ city, state });

        if (result.deletedCount > 0) {
            res.json({
                message: "Location deleted successfully!",
                deleted: true
            });
        } else {
            res.status(404).json({
                error: "Location not found in favorites",
                deleted: false
            });
        }
    } catch (error) {
        console.error("Delete location error:", error.message);
        res.status(500).json({
            error: "Failed to delete location",
            message: error.message
        });
    }
});

/**
 * GET /checkLocation
 * Checks if a location exists in the user's favorites list
 * 
 * Query Parameters:
 * @param {string} city - City name
 * @param {string} state - State name
 * 
 * @returns {Object} Existence status message
 */
app.get("/checkLocation", async (req, res) => {
    try {
        const { city, state } = req.query;

        // Validate required parameters
        const validation = validateQueryParams(req.query, ['city', 'state']);
        if (!validation.isValid) {
            return res.status(400).json({
                error: "Missing required parameters",
                missing: validation.missing
            });
        }

        const existingLocation = await favouritesCollection.findOne({ city, state });

        if (existingLocation) {
            res.json({
                message: "Location exists in favorites",
                exists: true
            });
        } else {
            res.status(404).json({
                message: "Location does not exist in favorites",
                exists: false
            });
        }
    } catch (error) {
        console.error("Check location error:", error.message);
        res.status(500).json({
            error: "Failed to check location",
            message: error.message
        });
    }
});

// =============================================================================
// HEALTH CHECK & SERVER STATUS
// =============================================================================

/**
 * GET /
 * Health check endpoint
 * 
 * @returns {Object} Server status and information
 */
app.get("/", (req, res) => {
    res.json({
        message: "Weather Application API Server",
        status: "🟢 Online",
        version: "1.0.0",
        endpoints: {
            geocoding: ["/geoencode", "/reverseGeoencode", "/autoDetectLocation"],
            weather: ["/getWeatherData", "/getTimelineData"],
            favorites: ["/storeLocation", "/retrieveLocations", "/deleteLocation", "/checkLocation"]
        },
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /health
 * Detailed health check with database connectivity
 */
app.get("/health", async (req, res) => {
    try {
        // Check database connection
        await db.admin().ping();

        res.json({
            status: "🟢 Healthy",
            database: "🟢 Connected",
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            status: "🔴 Unhealthy",
            database: "🔴 Disconnected",
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Apply error handler middleware
app.use(errorHandler);

// Handle 404 for unknown routes
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`,
        availableEndpoints: {
            geocoding: ["/geoencode", "/reverseGeoencode", "/autoDetectLocation"],
            weather: ["/getWeatherData", "/getTimelineData"],
            favorites: ["/storeLocation", "/retrieveLocations", "/deleteLocation", "/checkLocation"],
            system: ["/", "/health"]
        }
    });
});

// =============================================================================
// SERVER STARTUP
// =============================================================================

const PORT = process.env.PORT || 5000;

/**
 * Graceful shutdown handler
 */
process.on('SIGINT', async () => {
    console.log('\n🔄 Gracefully shutting down...');
    try {
        await mongoClient.close();
        console.log('✅ MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
    }
});

// Start the server
app.listen(PORT, async () => {
    console.log('🚀 Starting Weather Application Server...');
    await connectToMongo();
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 API documentation available at http://localhost:${PORT}/`);
    console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
});