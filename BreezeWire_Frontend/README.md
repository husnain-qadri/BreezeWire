# BreezeWire Frontend

A modern, responsive React TypeScript application that provides comprehensive weather information with interactive maps, real-time forecasts, and intuitive user interface.

## 🌟 Features

### 🌦️ **Weather Intelligence**
- **Real-time Weather Data**: Current conditions with temperature, humidity, pressure, and visibility
- **5-Day Forecasts**: Detailed daily and hourly weather predictions
- **Weather Charts**: Interactive visualizations using Highcharts for temperature, humidity, pressure trends
- **Weather Icons**: Dynamic weather condition representations

### 🗺️ **Interactive Mapping**
- **Google Maps Integration**: High-quality maps with location search and selection
- **Location Search**: Address-based location finding with autocomplete
- **Click-to-Select**: Easy location selection directly on the map
- **Auto-Detection**: Automatic location detection based on user's IP address

### ⭐ **User Experience**
- **Favorites Management**: Save and quickly access favorite locations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with React Bootstrap
- **Fast Loading**: Optimized build with code splitting and lazy loading

### 📊 **Data Visualization**
- **Interactive Charts**: Temperature, humidity, pressure, and wind data visualization
- **Hourly Trends**: Detailed hourly weather progression over 5 days
- **Weather Metrics**: Comprehensive meteorological data display

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18**: Latest React with concurrent features and improved performance
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Lightning-fast build tool and development server

### **UI & Styling**
- **React Bootstrap**: Responsive components and grid system
- **Bootstrap 5**: Modern CSS framework with utility classes
- **Bootstrap Icons**: Comprehensive icon library

### **Maps & Location**
- **@react-google-maps/api**: Official Google Maps React integration
- **@vis.gl/react-google-maps**: Advanced mapping components
- **Google Places API**: Location search and autocomplete functionality

### **Data Visualization**
- **Highcharts**: Professional charting library
- **Highcharts React**: Official React wrapper for Highcharts

### **Development Tools**
- **ESLint**: Code linting with React-specific rules
- **TypeScript ESLint**: Enhanced TypeScript linting
- **Vite**: Fast development server with HMR (Hot Module Replacement)

## 📋 Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Google Maps API Key** (for map functionality)
- **BreezeWire Backend API** (running on http://localhost:5000)

## 🚀 Getting Started

### **1. Installation**

```bash
# Clone the repository
git clone https://github.com/husnain-qadri/BreezeWire.git
cd BreezeWire/Assignment3_Frontend

# Install dependencies
npm install
```

### **2. Environment Configuration**

Create a `.env.local` file in the root directory:

```env
# Google Maps API Configuration
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Backend API Configuration  
VITE_API_BASE_URL=http://localhost:5000

# App Configuration
VITE_APP_TITLE=BreezeWire
VITE_APP_DESCRIPTION=Modern Weather Application
```

### **3. Development**

```bash
# Start development server
npm run dev

# The app will open automatically at http://localhost:3000
```

### **4. Building for Production**

```bash
# Type checking
npm run type-check

# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📱 Application Structure

```
Assignment3_Frontend/
├── dist/                       # Production build output
│   ├── assets/                 # Bundled CSS, JS, and static assets
│   │   ├── index-[hash].js     # Main application bundle
│   │   ├── index-[hash].css    # Compiled styles
│   │   └── ...                 # Icons, images, fonts
│   └── index.html              # Entry HTML file
├── src/                        # Source code (if available)
│   ├── components/             # React components
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API services
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── App.tsx                 # Main application component
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint and fix issues |
| `npm run lint:check` | Check for linting issues without fixing |
| `npm run type-check` | Run TypeScript type checking |
| `npm run clean` | Clean build directory |
| `npm run serve` | Serve production build on port 3000 |

## 🌐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | ✅ | - |
| `VITE_API_BASE_URL` | Backend API base URL | ✅ | `http://localhost:5000` |
| `VITE_APP_TITLE` | Application title | ❌ | `BreezeWire` |
| `VITE_APP_DESCRIPTION` | App description | ❌ | `Weather Application` |

## 🎨 Features Overview

### **Main Dashboard**
- Current weather display with temperature and conditions
- Location search with Google Places autocomplete
- Interactive map for location selection
- Quick access to favorite locations

### **Weather Forecast**
- 5-day weather forecast with daily summaries
- Hourly breakdown for detailed planning
- Weather condition icons and descriptions
- Temperature, humidity, and precipitation data

### **Interactive Charts**
- Temperature trends over time
- Humidity and pressure variations
- Wind speed and direction data
- Customizable time ranges

### **Location Management**
- Add/remove favorite locations
- Quick switching between saved locations
- Auto-detection of current location
- Search history and suggestions

## 📱 Responsive Design

BreezeWire is fully responsive and optimized for:

- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Adapted layout with collapsible menus
- **Mobile**: Touch-optimized interface with bottom navigation

## 🔄 API Integration

The frontend communicates with the BreezeWire backend API for:

- **Weather Data**: Real-time and forecast information
- **Geocoding**: Address to coordinates conversion
- **Location Services**: IP-based location detection
- **Favorites**: User preference storage

### **API Endpoints Used**
```typescript
// Weather data
GET /getWeatherData?latitude={lat}&longitude={lng}&timesteps={step}
GET /getTimelineData?latitude={lat}&longitude={lng}

// Location services
GET /geoencode?street={street}&city={city}&state={state}
GET /reverseGeoencode?latitude={lat}&longitude={lng}
GET /autoDetectLocation

// Favorites management
POST /storeLocation
GET /retrieveLocations
DELETE /deleteLocation
GET /checkLocation?city={city}&state={state}
```

## 🚨 Error Handling

The application includes comprehensive error handling for:

- **Network Issues**: Connection failures and timeouts
- **API Errors**: Invalid responses and rate limiting
- **Location Errors**: GPS access denied or unavailable
- **Data Validation**: Invalid input and missing data

## ⚡ Performance Optimizations

- **Code Splitting**: Separate bundles for vendor libraries
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Minimized and compressed assets
- **Caching**: Browser caching for static assets
- **Tree Shaking**: Unused code elimination

## 🎯 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions  
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 🚀 Deployment

### **Static Hosting**
```bash
# Build for production
npm run build

# Deploy dist/ folder to:
# - Netlify
# - Vercel  
# - GitHub Pages
# - AWS S3 + CloudFront
# - Google Cloud Storage
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]
```

### **Environment-Specific Builds**
```bash
# Development build
npm run build:dev

# Staging build  
npm run build:staging

# Production build
npm run build
```

## 🔒 Security Considerations

- **API Keys**: Stored in environment variables
- **HTTPS**: Enforced in production
- **CSP**: Content Security Policy headers
- **Input Validation**: Client-side validation for user inputs

## 🤝 Contributing

1. **Code Style**: Follow ESLint and TypeScript conventions
2. **Components**: Create reusable, typed components
3. **Testing**: Add tests for new features (when test setup is available)
4. **Documentation**: Update README for new features

## 📄 License

This project is for educational purposes as part of a university course assignment.

## 🆘 Support

For issues and questions:
- **Repository**: [GitHub Issues](https://github.com/husnain-qadri/BreezeWire/issues)
- **Documentation**: This README file
- **API Documentation**: See backend README

---

**Built with ❤️ using React + TypeScript + Vite**

🌦️ **Experience weather like never before with BreezeWire!**
