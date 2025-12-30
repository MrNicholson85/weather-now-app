# Weather Now App - AI Coding Assistant Instructions

## Project Overview

Nuxt 3 weather application using Open-Meteo API (no API key required), Tailwind CSS, and Vue 3 composition API. Supports dark/light themes and metric/imperial/custom unit systems with localStorage persistence.

## Architecture & Data Flow

### State Management Pattern
- **No Vuex/Pinia**: Uses custom composables in `composables/` for global state
- **localStorage-backed reactive state**: All composables use `ref()` + `watch()` + `onMounted()` pattern
- **Example**: See [composables/useTheme.js](composables/useTheme.js), [composables/useMeasurementSystem.js](composables/useMeasurementSystem.js), [composables/useUnitSettings.js](composables/useUnitSettings.js)

### Weather Data Pipeline
1. **Geocoding** → Open-Meteo Geocoding API converts city name to lat/lon
2. **Weather fetch** → Open-Meteo Forecast API returns current + daily (7 days) + hourly data
3. **Data enrichment** → Current weather enhanced with humidity/precipitation from hourly array (see [pages/index.vue](pages/index.vue#L256-L276))
4. **Display logic** → Weather codes mapped to icons in `getWeatherIcon()` function
5. **Unit conversion** → All conversions happen in display layer (`formatTemp`, `formatWind`, `formatPrecip` functions)

## Styling Conventions

### CSS Architecture
- **Tailwind utility-first**: Use Tailwind classes directly in templates with `@apply` for reusable components
- **Dark mode**: Class-based (`darkMode: "class"` in [tailwind.config.js](tailwind.config.js#L9)) - toggle adds/removes `dark` class on `<html>`
- **Custom colors**: Use `wna` prefix (e.g., `wnaNeutral900`, `blue500`) defined in [tailwind.config.js](tailwind.config.js#L11-L20)
- **SCSS modules**: Component-specific styles in `assets/css/modules/` imported via [assets/css/tailwind.css](assets/css/tailwind.css#L4-L6)
- **Custom fonts**: 5 font families (BricolageGrotesqueBold, DMSans variants) loaded via `@font-face` in [assets/css/tailwind.css](assets/css/tailwind.css#L8-L36)

### Component Styling Pattern
```vue
<template>
  <button class="bg-blue500 dark:bg-wnaNeutral800 rounded-[8px] px-4 py-2">
</template>
<style scoped>
/* Use @apply only for reusable component classes */
.theme-btn {
  @apply cursor-pointer ease-in-out duration-200;
}
</style>
```

## Key Composables Usage

### Theme Management
```javascript
import { useTheme } from "~/composables/useTheme";
const { theme, toggleTheme, setTheme } = useTheme();
// theme.value: 'light' | 'dark'
// Auto-detects system preference on first load
```

### Unit System (Simple Toggle)
```javascript
import { useMeasurementSystem } from "~/composables/useMeasurementSystem";
const { system, toggleSystem } = useMeasurementSystem();
// system.value: 'metric' | 'imperial'
```

### Unit Settings (Granular Control)
```javascript
import { useUnitSettings } from "~/composables/useUnitSettings";
const { unitSettings, setUnit, setSystem } = useUnitSettings();
// unitSettings.value: { system, temperature, windSpeed, precipitation }
// system: 'metric' | 'imperial' | 'custom' (auto-set if user changes individual units)
```

## Weather Code Mappings

Weather codes (0-99) from Open-Meteo require two mappings:
- **Description**: See `weatherDescription()` in [pages/index.vue](pages/index.vue#L322-L356)
- **Icon**: See `getWeatherIcon()` in [pages/index.vue](pages/index.vue#L359-L392) → maps to `/public/images/weather_icons/{name}.svg`

**Example**: Code `63` → "Moderate rain" + `rain.svg`

## Development Workflow

### Commands
```bash
yarn dev           # Dev server on localhost:3000
yarn build         # SSR production build
yarn generate      # Static site generation (SSG)
yarn preview       # Preview production build
```

### Hot Module Replacement (HMR)
- Auto-reloads on `.vue`, `.js`, `.css` changes
- localStorage persists across HMR (test theme/unit toggles without losing state)

### Adding New Weather Variables
1. Check [Open-Meteo API docs](https://open-meteo.com/en/docs) for parameter name
2. Add to `weatherUrl` query string in [pages/index.vue](pages/index.vue#L260)
3. Extract from response in `fetchWeather()` function
4. Create format function (e.g., `formatPrecip`) using `unitSettings.value.{unit}`
5. Display in template using format function

## Critical File Relationships

- **[nuxt.config.ts](nuxt.config.ts)** → Defines modules (`@nuxtjs/tailwindcss`), app metadata
- **[tailwind.config.js](tailwind.config.js)** → Custom colors, fonts, dark mode config
- **[assets/css/tailwind.css](assets/css/tailwind.css)** → Global styles, font imports, module aggregation
- **[layouts/default.vue](layouts/default.vue)** → Wraps all pages with header
- **[components/header.vue](components/header.vue)** → Logo + ThemeSwitcher + UnitSettings
- **[pages/index.vue](pages/index.vue)** → Main weather page (all weather logic here)

## Common Pitfalls

1. **localStorage SSR errors**: Always wrap localStorage access in `onMounted()` hook (see composables)
2. **Weather code fallback**: Always include `|| "Unknown"` or default icon when mapping codes
3. **Hourly forecast filtering**: Current implementation shows 8 hours starting from current hour (see `getHourlyForDay()` in [pages/index.vue](pages/index.vue#L396-L411))
4. **Image paths**: Use `~/public/images/` for static assets, accessed as `/images/` in templates
5. **Dark mode images**: Conditionally render different icons based on `theme.value` (see [components/header.vue](components/header.vue#L5-L17))

## Extension Points

- **New unit types**: Add to `unitSettings` object in [composables/useUnitSettings.js](composables/useUnitSettings.js#L3-L8)
- **New pages**: Create in `pages/` (auto-routing) - see [pages/about.vue](pages/about.vue) example
- **New weather providers**: Replace fetch URLs in [pages/index.vue](pages/index.vue#L250-L266), maintain same data structure
