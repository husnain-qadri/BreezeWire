# BreezeWire - Weather Application

A full-stack weather application that provides current weather conditions, forecasts, and interactive maps with location search capabilities.

## 🌦️ Features

- **Current Weather Data**: Real-time weather information including temperature, humidity, pressure, wind speed, and visibility
- **5-Day Weather Forecast**: Extended weather predictions with detailed daily forecasts
- **Interactive Maps**: Google Maps integration for location selection and visualization
- **Location Services**: 
  - Auto-detect user location using IP geolocation
  - Manual address search with geocoding
  - Reverse geocoding for coordinate-to-address conversion
- **Favorites Management**: Save and manage favorite locations with MongoDB storage
- **Weather Charts**: Interactive data visualization using Highcharts
- **Responsive Design**: Modern UI built with Bootstrap and React Bootstrap

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **Bootstrap 5** for responsive UI components
- **Google Maps API** for map integration (@react-google-maps/api)
- **Highcharts** for data visualization
- **React Bootstrap** for UI components

### Backend
- **Node.js** with Express.js
- **MongoDB** for data persistence (favorites storage)
- **Google Maps Services** for geocoding and location services
- **Tomorrow.io API** for weather data
- **IPinfo API** for IP-based location detection
- **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
BreezeWire/
├── BreezeWire_Frontend/          # React TypeScript Frontend
│   ├── dist/                     # Built production files
│   ├── src/                      # Source code (components, styles, etc.)
│   ├── package.json              # Frontend dependencies
│   └── vite.config.ts            # Vite configuration
├── BreezeWire_Backend/           # Node.js Express Backend
│   ├── index.js                  # Main server file with API routes
│   ├── package.json              # Backend dependencies
│   └── .gcloudignore            # Google Cloud deployment config
└── README.md                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- API Keys for:
  - Google Maps API
  - Tomorrow.io Weather API
  - IPinfo API

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd BreezeWire_Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API keys:
   ```env
   GOOGLE_API=your_google_maps_api_key
   TOMORROW_API=your_tomorrow_io_api_key
   IPINFO=your_ipinfo_api_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd BreezeWire_Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🔧 API Endpoints

### Weather & Location Services
- `GET /geoencode` - Convert address to coordinates
- `GET /reverseGeoencode` - Convert coordinates to address
- `GET /autoDetectLocation` - Auto-detect user location via IP
- `GET /getWeatherData` - Fetch current weather data
- `GET /getTimelineData` - Fetch hourly weather timeline (5 days)

### Favorites Management
- `POST /storeLocation` - Save a location to favorites
- `GET /retrieveLocations` - Retrieve all saved locations
- `DELETE /deleteLocation` - Remove a location from favorites
- `GET /checkLocation` - Check if location exists in favorites

## 🌐 Deployment

The application is configured for Google Cloud Platform deployment with `.gcloudignore` files included for both frontend and backend.

### Backend Deployment
The backend is set up as an Express.js server that can be deployed to Google Cloud Run or App Engine.

### Frontend Deployment
The frontend is built with Vite and can be deployed to static hosting services or Google Cloud Storage.

## 📊 Key Features in Detail

### Weather Data Visualization
- Interactive charts showing temperature, humidity, pressure, wind speed, and wind direction trends
- 5-day forecast with detailed daily weather conditions
- Real-time weather updates based on selected location

### Location Management
- Search locations by address with Google Places autocomplete
- Click-to-select locations on interactive maps
- Automatic location detection using user's IP address
- Save frequently accessed locations for quick access

### User Interface
- Clean, modern design with Bootstrap styling
- Responsive layout that works on desktop and mobile devices
- Intuitive navigation between current weather and forecast views
- Loading states and error handling for better user experience

## 🔑 Environment Setup

### Required API Keys
1. **Google Maps API**: Enable Maps JavaScript API, Places API, and Geocoding API
2. **Tomorrow.io API**: Sign up for weather data access
3. **IPinfo API**: For IP-based location detection

### MongoDB Configuration
Ensure MongoDB is running locally or configure connection to MongoDB Atlas for cloud deployment.

## 🤝 Contributing

This project is open for contributions. Please ensure all changes maintain code quality and follow the established patterns.

## 📄 License

This project is for educational and portfolio demonstration purposes.

## 👨‍💻 Development Notes

- The application uses environment variables for API key management
- MongoDB connection is configured for cloud deployment
- CORS is enabled for development with separate frontend/backend servers
- TypeScript provides type safety for the React frontend
- ESLint configuration ensures code quality and consistency

## 🐛 Troubleshooting

### Common Issues
- **API Key Errors**: Ensure all required API keys are properly configured in the `.env` file
- **CORS Issues**: Verify backend server is running and CORS is properly configured
- **MongoDB Connection**: Check MongoDB service is running and connection string is correct
- **Build Errors**: Clear node_modules and reinstall dependencies if build fails

### Getting Help
If you encounter issues, check:
1. All dependencies are installed (`npm install`)
2. Environment variables are properly set
3. API keys have necessary permissions enabled
4. MongoDB service is accessible 