<template>
  <div>
    <h1
      class="font-BricolageGrotesqueBold flex justify-center text-center lg:text-left text-[52px] mb-[64px] leading-[62px] mg:leading-auto"
    >
      How’s the sky looking today?
    </h1>
    <div class="wna-forecaster">
      <div class="search_menu">
        <div class="w-full lg:w-auto flex relative">
          <img
            src="~/public/images/icons/search-icon.svg"
            class="w-[16px] absolute left-4 top-1/2 -translate-y-1/2"
            alt="search icon"
          />
          <input
            v-model="city"
            type="text"
            placeholder="Search for a place..."
            class="search-input text-black font-DMSansMedium text-[20px] px-4 py-2 rounded-[12px] h-[56px] w-full md:w-[590px] lg:w-[526px] bg-wnaNeutral800 before:w-[16px] before:absolute reltive pl-[52px] focus:outline-none"
          />
        </div>
        <button
          @click="searchWeather"
          class="bg-blue500 font-DMSansMedium text-[20px] text-white px-4 py-2 w-full md:w-[114px] h-[56px] rounded-[12px]"
        >
          Search
        </button>
      </div>
      <div class="forecast-layout">
        <div v-if="weather" class="forecast-wrapper grid lg:flex gap-8">
          <div
            class="feat-location-card w-full rounded-[20px] overflow-hidden md:w-[720px] lg:w-[800px]"
          >
            <div
              class="loc-info bg-[url('~/public/images/mobile-hero-bg.svg')] md:bg-[url('~/public/images/desktop-hero-bg.svg')] py-7 md:py-[80px] px-[24px] grid md:flex justify-between relative h-[286px] align-middle bg-cover bg-no-repeat mb-[48px]"
            >
              <div class="info flex flex-col justify-center">
                <div
                  class="font-DMSansBold text-[28px] mb-3 info-header text-center md:text-start"
                >
                  {{ locationName }}
                </div>
                <div
                  class="text-[18px] text-gray-300 info-date text-center md:text-start"
                >
                  {{
                    new Date().toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  }}
                </div>
              </div>
              <div
                class="font-DMSansMedium text-lg weather-info items-center flex justify-center"
              >
                <div class="text-lg">
                  <img
                    :src="`/images/weather_icons/${getWeatherIcon(
                      weather.weathercode
                    )}`"
                    class="w-[120px] h-[120px]"
                    alt="weather icon"
                  />
                </div>
                <div class="text-[96px] font-DMSansSemiBold font-italic">
                  {{ toFahrenheit(weather.temperature) }}°
                </div>
              </div>
            </div>
            <div class="wna-weather-vars">
              <div class="var-card wna-weather-feels-like">
                <span>Feels like:</span>
                <p>{{ toFahrenheit(weather.temperature) }}°</p>
              </div>
              <div class="var-card wna-weather-humidity">
                <span>Humidity:</span>
                <p>
                  {{
                    weather.humidity !== null ? weather.humidity + "%" : "N/A"
                  }}
                </p>
              </div>
              <div class="var-card wna-weather-wind">
                <span>Wind:</span>
                <p>{{ weather.windspeed }} km/h</p>
              </div>
              <div class="var-card wna-weather-precipitation">
                <span>Precipitation:</span>
                <p>
                  {{
                    weather.precipitation !== null
                      ? weather.precipitation + " mm"
                      : "N/A"
                  }}
                </p>
              </div>
            </div>
            <h2 class="text-[20px] mb-[20px] font-DMSansSemiBold">
              Daily forecast
            </h2>
            <div
              class="loc-daily-forecast-cards grid grid-cols-3 md:grid-cols-none md:flex gap-x-4 gap-y-4 lg:gap-6"
            >
              <div
                v-for="day in dailyForecast"
                :key="day.date"
                class="loc-forecast-card bg-wnaNeutral800 rounded-[12px] w-full flex flex-col items-center py-4"
              >
                <div class="font-DMSansBold text-[20px]">
                  {{
                    new Date(day.date).toLocaleDateString(undefined, {
                      weekday: "short",
                    })
                  }}
                </div>
                <img
                  :src="`/images/weather_icons/${getWeatherIcon(day.code)}`"
                  class="w-[60px]"
                  alt="weather icon"
                />
                <ul class="font-DMSansMedium flex justify-between text-[16px]">
                  <li>{{ toFahrenheit(day.max) }}°</li>
                  <li>{{ toFahrenheit(day.min) }}°</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="hourly-forecast">
            <div class="hourly-header">
              <h3>Hourly forecast</h3>
              <select v-model="selectedDay" class="hourly-select">
                <option
                  v-for="(day, idx) in dailyForecast"
                  :key="day.date"
                  :value="idx"
                >
                  {{
                    new Date(day.date).toLocaleDateString(undefined, {
                      weekday: "long",
                    })
                  }}
                </option>
              </select>
            </div>
            <ul class="hours">
              <li
                v-for="hour in getHourlyForDay(selectedDay)"
                :key="hour.time"
                class="hour-item"
              >
                <div class="flex gap-1 justify-center items-center">
                  <img
                    :src="`/images/weather_icons/${getWeatherIcon(hour.code)}`"
                    class="w-[40px] h-[40px]"
                    alt="weather icon"
                  />
                  <div class="hour-time">
                    {{
                      new Date(hour.time).getHours() % 12 === 0
                        ? 12
                        : new Date(hour.time).getHours() % 12
                    }}
                    {{ new Date(hour.time).getHours() < 12 ? "AM" : "PM" }}
                  </div>
                </div>
                <div class="hour-temp">{{ toFahrenheit(hour.temp) }}°</div>
              </li>
            </ul>
          </div>
        </div>
        <span v-else-if="loading">Loading...</span>
        <span v-else-if="error">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import chevron from "~/public/images/icons/units-dropdown-icon.svg";

// --- Reactive state variables ---
const city = ref("Seattle"); // Default city shown on load
const weather = ref(null); // Holds current weather data
const locationName = ref(""); // Display name for location
const loading = ref(false); // Loading state for API requests
const error = ref(""); // Error message for failed requests
const dailyForecast = ref([]); // Array of daily forecast objects
const hourlyForecast = ref([]); // Array of hourly forecast objects
const selectedDay = ref(0); // Index of selected day for hourly forecast (0 = today)

// --- Utility: Convert Celsius to Fahrenheit, rounded to whole number ---
function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

// --- Main function: Fetch weather and forecast data for a city ---
async function fetchWeather(cityName) {
  loading.value = true;
  error.value = "";
  weather.value = null;
  dailyForecast.value = [];
  hourlyForecast.value = [];

  // 1. Geocoding: Get latitude/longitude for the city
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cityName
  )}&count=1`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  // If city not found, show error and stop
  if (!geoData.results || geoData.results.length === 0) {
    error.value = "City not found.";
    loading.value = false;
    return;
  }

  // Extract coordinates and display name
  const { latitude, longitude, name, country } = geoData.results[0];
  locationName.value = `${name}, ${country}`;

  // 2. Weather API: Get current, daily, and hourly forecast
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode,relative_humidity_2m,precipitation&timezone=auto`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  // --- Current weather ---
  weather.value = weatherData.current_weather;

  // Find the current hour's index in hourly data
  const now = new Date();
  const currentHour = now.getHours();
  const hourString = now.toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
  const humidityIndex = weatherData.hourly.time.findIndex((t) =>
    t.startsWith(hourString)
  );
  // Add humidity and precipitation to current weather
  weather.value.humidity =
    weatherData.hourly.relative_humidity_2m[humidityIndex] ?? null;
  weather.value.precipitation =
    weatherData.hourly.precipitation[humidityIndex] ?? null;

  // --- Daily forecast: Next 7 days ---
  dailyForecast.value = Array.from({ length: 7 }, (_, i) => ({
    date: weatherData.daily.time[i], // ISO date string
    max: weatherData.daily.temperature_2m_max[i], // Max temp (C)
    min: weatherData.daily.temperature_2m_min[i], // Min temp (C)
    code: weatherData.daily.weathercode[i], // Weather code
  }));

  // --- Hourly forecast: All available hours ---
  hourlyForecast.value = [];
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    hourlyForecast.value.push({
      time: weatherData.hourly.time[i], // ISO datetime string
      temp: weatherData.hourly.temperature_2m[i], // Temp (C)
      code: weatherData.hourly.weathercode[i], // Weather code
      humidity: weatherData.hourly.relative_humidity_2m[i], // Humidity (%)
      precipitation: weatherData.hourly.precipitation[i], // Precipitation (mm)
    });
  }

  loading.value = false;
}

// --- Trigger weather fetch when user searches for a city ---
function searchWeather() {
  if (!city.value) return;
  fetchWeather(city.value);
}

// --- Map Open-Meteo weather codes to human-readable descriptions ---
function weatherDescription(code) {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return descriptions[code] || "Unknown";
}

// --- Map weather codes to icon filenames for display ---
function getWeatherIcon(code) {
  const iconMap = {
    0: "clear-sunny",
    1: "clear-sunny",
    2: "partly-cloudy",
    3: "overcast",
    45: "fog",
    48: "fog",
    51: "drizzle",
    53: "rain",
    55: "drizzle",
    56: "drizzle",
    57: "drizzle",
    61: "drizzle",
    63: "rain",
    65: "rain",
    66: "rain",
    67: "rain",
    71: "snow",
    73: "snow",
    75: "snow",
    77: "snow",
    80: "rain",
    81: "rain",
    82: "rain",
    85: "snow",
    86: "snow",
    95: "thunderstorm",
    96: "thunderstorm",
    99: "thunderstorm",
  };

  const iconName = iconMap[code];
  // Returns the path to the SVG icon for the weather code
  return iconName ? `${iconName}.svg` : "unknown.svg";
}

// --- Get 8 hourly forecast items for the selected day, starting from current hour ---
function getHourlyForDay(dayIdx) {
  if (!dailyForecast.value[dayIdx]) return [];
  const dayDate = dailyForecast.value[dayIdx].date;
  const now = new Date();
  // Filter hours for the selected day
  const hours = hourlyForecast.value.filter((h) => h.time.startsWith(dayDate));
  // Find the first hour that is >= current time
  const currentHour = now.getHours();
  const startIdx = hours.findIndex((h) => {
    const hour = new Date(h.time).getHours();
    return hour >= currentHour;
  });
  // If not found, start from 0
  const sliceStart = startIdx >= 0 ? startIdx : 0;
  // Return 8 hours: current + next 7
  return hours.slice(sliceStart, sliceStart + 8);
}

// --- On mount, fetch weather for default city (Seattle) ---
onMounted(() => {
  fetchWeather(city.value);
});
</script>

<style scoped></style>
