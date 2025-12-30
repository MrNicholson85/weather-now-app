# Weather Now App

A modern, responsive weather application built with Nuxt 3 that provides real-time weather information and forecasts with support for multiple measurement systems and themes.

## 🌟 Features

- **Real-time Weather Data**: Displays current weather conditions including temperature, humidity, wind speed, and precipitation
- **Location Search**: Search for weather information by city name
- **Daily Forecasts**: View weather forecasts for upcoming days
- **Theme Support**: Toggle between light and dark themes with persistent preferences
- **Unit System Toggle**: Switch between metric (°C, km/h) and imperial (°F, mph) measurements
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices
- **Weather Icons**: Visual weather condition indicators
- **Local Storage**: Saves user preferences (theme and unit system) for future visits

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (v3.19.2)
- **UI Framework**: [Vue 3](https://vuejs.org/) (v3.5.22)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) (v6.14.0)
  - SCSS/Sass for custom styles
- **Weather API**: [Open-Meteo](https://open-meteo.com/) (v1.2.1)
- **TypeScript**: Full TypeScript support
- **Package Manager**: Yarn

## 📁 Project Structure

```
weather-now-app/
├── assets/
│   ├── css/
│   │   ├── tailwind.css
│   │   └── modules/
│   │       ├── dailyForecast.scss
│   │       ├── searchBar.css
│   │       └── weatherVar.scss
│   └── font/
├── components/
│   ├── header.vue
│   ├── ThemeSwitcher.vue
│   ├── ToggleUnits.vue
│   └── UnitSettings.vue
├── composables/
│   ├── useMeasurementSystem.js
│   ├── useTheme.js
│   └── useUnitSettings.js
├── layouts/
│   └── default.vue
├── pages/
│   ├── about.vue
│   └── index.vue
├── public/
│   ├── images/
│   │   ├── icons/
│   │   └── weather_icons/
│   └── robots.txt
├── server/
├── nuxt.config.ts
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn, npm, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MrNicholson85/weather-now-app.git
cd weather-now-app
```

2. Install dependencies:
```bash
# yarn (recommended)
yarn install

# npm
npm install

# pnpm
pnpm install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev

# bun
bun run dev
```

## 🏗️ Building for Production

Build the application for production:

```bash
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build

# bun
bun run build
```

Locally preview production build:

```bash
# yarn
yarn preview

# npm
npm run preview

# pnpm
pnpm preview

# bun
bun run preview
```

## 📝 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `generate` - Generate static site
- `preview` - Preview production build locally
- `postinstall` - Prepare Nuxt (runs automatically after install)

## 🎨 Customization

### Theme Configuration

The app supports light and dark themes. Theme preferences are stored in localStorage and persist across sessions. The theme system is managed through the `useTheme` composable.

### Unit System

Users can toggle between:
- **Metric**: Celsius (°C), kilometers per hour (km/h)
- **Imperial**: Fahrenheit (°F), miles per hour (mph)

Preferences are stored in localStorage via the `useMeasurementSystem` composable.

### Styling

- Global styles: `assets/css/tailwind.css`
- Component-specific styles: `assets/css/modules/`
- Tailwind configuration: `tailwind.config.js`
- Custom fonts: Located in `assets/font/`

## 🌐 API Integration

This application uses the [Open-Meteo API](https://open-meteo.com/) for weather data. Open-Meteo is a free, open-source weather API that doesn't require an API key.

## 🚀 Future Improvements

Potential enhancements to consider for future development:

### Features
- **Geolocation Support**: Auto-detect user's location for immediate weather display
- **Favorite Locations**: Save and manage multiple cities for quick access
- **Weather Alerts**: Display severe weather warnings and notifications
- **Extended Forecast**: Add 14-day forecast option
- **Weather Maps**: Integrate radar and precipitation maps
- **Historical Data**: Show weather trends and comparisons with previous years
- **Air Quality Index**: Include AQI data and pollen count

### User Experience
- **Search Autocomplete**: Suggest cities as user types in search bar
- **Recent Searches**: Display recently searched locations
- **Shareable Links**: Generate URLs for specific city weather views
- **Progressive Web App (PWA)**: Add offline support and install capability
- **Animations**: Weather-based background animations and transitions

### Technical Enhancements
- **Response Caching**: Implement caching to reduce API calls and improve performance
- **Error Handling**: Enhanced error states with retry mechanisms
- **Loading Skeletons**: Replace loading text with skeleton components
- **Unit Tests**: Add Vitest for component and composable testing
- **E2E Tests**: Implement Playwright/Cypress for user flow testing
- **Performance Monitoring**: Add analytics and performance tracking
- **Accessibility**: WCAG 2.1 AA compliance audit and improvements
- **Internationalization (i18n)**: Multi-language support

### Data Visualization
- **Temperature Charts**: Line graphs showing temperature trends
- **Precipitation Graphs**: Rainfall/snowfall visualization
- **Wind Direction Indicator**: Compass-style wind direction display
- **UV Index Meter**: Visual UV level indicator with safety recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and not licensed for public use.

## 📚 Additional Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)

## 👤 Author

**MrNicholson85**

- GitHub: [@MrNicholson85](https://github.com/MrNicholson85)
