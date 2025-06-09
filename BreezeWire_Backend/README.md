# BreezeWire Backend API

A robust Node.js/Express REST API server that powers the Weather Application frontend with comprehensive weather data, location services, and user favorites management.

## 🚀 Features

- **Weather Data Integration**: Real-time weather information from Tomorrow.io API
- **Location Services**: Google Maps geocoding, reverse geocoding, and IP-based location detection
- **Favorites Management**: MongoDB-backed storage for user's favorite locations
- **Error Handling**: Comprehensive error handling with detailed logging
- **Health Monitoring**: Built-in health check endpoints
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend integration

## 🛠️ Tech Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB
- **External APIs**: 
  - Tomorrow.io (Weather Data)
  - Google Maps API (Geocoding)
  - IPinfo (IP Geolocation)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud)
- API keys for:
  - Google Maps API
  - Tomorrow.io Weather API
  - IPinfo API

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Assignment3_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # API Keys
   GOOGLE_API=your_google_maps_api_key
   TOMORROW_API=your_tomorrow_io_api_key
   IPINFO=your_ipinfo_api_key
   
   # Database
   MONGO_URI=your_mongodb_connection_string
   
   # Server Configuration
   PORT=5000
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### 🌍 Location & Geocoding Services

#### `GET /geoencode`
Converts street address to geographic coordinates.

**Query Parameters:**
- `street` (string): Street address
- `city` (string): City name  
- `state` (string): State name

**Example:**
```bash
GET /geoencode?street=123 Main St&city=Los Angeles&state=CA
```

#### `GET /reverseGeoencode`
Converts coordinates to street address.

**Query Parameters:**
- `latitude` (string): Latitude coordinate
- `longitude` (string): Longitude coordinate

**Example:**
```bash
GET /reverseGeoencode?latitude=34.0522&longitude=-118.2437
```

#### `GET /autoDetectLocation`
Auto-detects user location based on IP address.

**Response:** Location coordinates in "lat,lng" format

---

### 🌦️ Weather Data Services

#### `GET /getWeatherData`
Fetches comprehensive weather data including current conditions and forecasts.

**Query Parameters:**
- `latitude` (string): Latitude coordinate
- `longitude` (string): Longitude coordinate
- `timesteps` (string): Time intervals (`1d` for daily, `1h` for hourly)

**Example:**
```bash
GET /getWeatherData?latitude=34.0522&longitude=-118.2437&timesteps=1d
```

#### `GET /getTimelineData`
Fetches hourly weather timeline data for charts and analysis.

**Query Parameters:**
- `latitude` (string): Latitude coordinate
- `longitude` (string): Longitude coordinate

**Example:**
```bash
GET /getTimelineData?latitude=34.0522&longitude=-118.2437
```

---

### ⭐ Favorites Management

#### `POST /storeLocation`
Stores a location in favorites.

**Request Body:**
```json
{
  "city": "Los Angeles",
  "state": "CA"
}
```

#### `GET /retrieveLocations`
Retrieves all stored favorite locations.

**Response:**
```json
[
  {"city": "Los Angeles", "state": "CA"},
  {"city": "New York", "state": "NY"}
]
```

#### `DELETE /deleteLocation`
Removes a location from favorites.

**Request Body:**
```json
{
  "city": "Los Angeles", 
  "state": "CA"
}
```

#### `GET /checkLocation`
Checks if a location exists in favorites.

**Query Parameters:**
- `city` (string): City name
- `state` (string): State name

---

### 🏥 System Endpoints

#### `GET /`
Basic server information and available endpoints.

#### `GET /health`
Detailed health check including database connectivity status.

**Response:**
```json
{
  "status": "🟢 Healthy",
  "database": "🟢 Connected",
  "uptime": 3600.123,
  "memory": {...},
  "timestamp": "2023-12-01T10:00:00.000Z"
}
```

## 📝 Response Format

### Success Response
```json
{
  "data": {...},
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "missing": ["required_field"] // for validation errors
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API` | Google Maps API key | ✅ |
| `TOMORROW_API` | Tomorrow.io API key | ✅ |
| `IPINFO` | IPinfo API key | ✅ |
| `MONGO_URI` | MongoDB connection string | ✅ |
| `PORT` | Server port (default: 5000) | ❌ |

### MongoDB Collections

- **favourites**: Stores user's favorite locations
  ```json
  {
    "_id": "ObjectId",
    "city": "string",
    "state": "string", 
    "createdAt": "Date"
  }
  ```

## 🔒 Security Features

- **Input Validation**: All endpoints validate required parameters
- **Error Handling**: Comprehensive error handling prevents data leakage
- **Environment Variables**: Sensitive data stored in environment variables
- **CORS Configuration**: Controlled cross-origin access

## 🚨 Error Handling

The API implements comprehensive error handling:

- **400 Bad Request**: Missing or invalid parameters
- **404 Not Found**: Resource not found or endpoint doesn't exist
- **500 Internal Server Error**: Server or external API errors
- **503 Service Unavailable**: Database connectivity issues

## 📊 Logging

The server includes detailed logging for:
- API requests and responses
- Database operations
- External API calls
- Error tracking with stack traces

## 🔄 Development

### Available Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with auto-reload
npm test         # Run tests (placeholder)
npm run lint     # Run linting (placeholder)
```

### Development Tips

1. Use `npm run dev` for development with auto-reload
2. Check `/health` endpoint to verify database connectivity
3. Monitor console logs for detailed request/response information
4. Use environment variables for all sensitive configuration

## 🌐 Deployment

### Google Cloud Platform
The project includes `.gcloudignore` for GCP deployment:

```bash
gcloud app deploy
```

### Docker (Optional)
Create a `Dockerfile`:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Follow the existing code style and structure
2. Add proper JSDoc comments for new functions
3. Include error handling for all new endpoints
4. Update this README for any new features

## 📄 License

This project is for educational purposes as part of a university course assignment.

---

**Server Status:** Visit `http://localhost:5000/` for real-time server information and available endpoints. 