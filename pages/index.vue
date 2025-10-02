<template>
  <div>
    <h1
      class="font-BricolageGrotesqueBold flex justify-center text-[52px] mb-[64px]"
    >
      How’s the sky looking today?
    </h1>
    <div class="wna-forecaster">
      <div class="search_menu">
        <div class="search-icon flex relative">
          <img
            src="~/assets/images/icons/search-icon.svg"
            class="w-[16px] absolute left-4 top-1/2 -translate-y-1/2"
          />
          <input
            v-model="city"
            type="text"
            placeholder="Search for a place..."
            class="search-input text-black font-DMSansMedium text-[20px] px-4 py-2 rounded-[12px] w-[526px] bg-wnaNeutral800 before:w-[16px] before:absolute reltive pl-[52px] focus:outline-none"
          />
        </div>
        <button
          @click="searchWeather"
          class="bg-blue500 font-DMSansMedium text-[20px] text-white px-4 py-2 w-[114px] h-[56px] rounded-[12px]"
        >
          Search
        </button>
      </div>
      <div class="forecast-layout">
        <div v-if="weather" class="flex gap-8">
          <div class="feat-location-card max-w-[800px]">
            <div
              class="loc-info bg-[url('~/assets/images/desktop-hero-bg.svg')] py-[80px] px-[24px] flex justify-between relative h-[286px] align-middle bg-cover bg-no-repeat mb-[48px]"
            >
              <div class="info flex flex-col justify-center">
                <div class="font-DMSansBold text-[28px] mb-3 info-header">
                  {{ locationName }}
                </div>
                <div class="text-[18px] text-gray-300 info-date">
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
                class="font-DMSansMedium text-lg weather-info items-center flex"
              >
                <div class="text-lg">
                  <img
                    :src="getWeatherIcon(weather.weathercode)"
                    class="w-[120px] h-[120px]"
                    alt="weather icon"
                  />
                </div>
                <div class="text-[96px] font-DMSansSemiBold font-italic">
                  {{ toFahrenheit(weather.temperature) }}°
                </div>
              </div>
            </div>
            <div class="wna-weather-vars flex gap-6 mb-12 justify-between">
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
            <div class="loc-daily-forecast-cards flex gap-6">
              <div
                v-for="(day, idx) in dailyForecast"
                :key="day.date"
                class="loc-forecast-card bg-wnaNeutral800 rounded-[12px] w-[100.57px] flex flex-col items-center"
              >
                <div class="font-DMSansBold text-[20px] mb-2">
                  {{
                    new Date(day.date).toLocaleDateString(undefined, {
                      weekday: "short",
                    })
                  }}
                </div>
                <img
                  :src="getWeatherIcon(day.code)"
                  class="w-[64px] mb-2"
                  alt="weather icon"
                />
                <ul class="font-DMSansMedium flex justify-between text-[16px]">
                  <li>{{ toFahrenheit(day.max) }}°</li>
                  <li>{{ toFahrenheit(day.min) }}°</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="hourly-forecast rounded-[12px] bg-wnaNeutral800 w-full h-auto"
          ></div>
        </div>
        <span v-else-if="loading">Loading...</span>
        <span v-else-if="error">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const city = ref("Seattle");
const weather = ref(null);
const locationName = ref("");
const loading = ref(false);
const error = ref("");
const dailyForecast = ref([]);

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

async function fetchWeather(cityName) {
  loading.value = true;
  error.value = "";
  weather.value = null;
  dailyForecast.value = [];

  // Geocoding API to get coordinates
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cityName
  )}&count=1`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    error.value = "City not found.";
    loading.value = false;
    return;
  }

  const { latitude, longitude, name, country } = geoData.results[0];
  locationName.value = `${name}, ${country}`;

  // Weather API: get current and daily forecast + humidity
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=relative_humidity_2m,precipitation&timezone=auto`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  weather.value = weatherData.current_weather;

  // Get current humidity (match current hour)
  const now = new Date();
  const currentHour = now.getHours();
  const hourString = now.toISOString().slice(0, 13);
  const humidityIndex = weatherData.hourly.time.findIndex((t) =>
    t.startsWith(hourString)
  );
  weather.value.humidity =
    weatherData.hourly.relative_humidity_2m[humidityIndex] ?? null;

  // Get current precipitation
  weather.value.precipitation =
    weatherData.hourly.precipitation[humidityIndex] ?? null;

  // Prepare daily forecast for next 7 days
  dailyForecast.value = Array.from({ length: 7 }, (_, i) => ({
    date: weatherData.daily.time[i],
    max: weatherData.daily.temperature_2m_max[i],
    min: weatherData.daily.temperature_2m_min[i],
    code: weatherData.daily.weathercode[i],
  }));

  loading.value = false;
}

function searchWeather() {
  if (!city.value) return;
  fetchWeather(city.value);
}

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

function getWeatherIcon(code) {
  // Map weather codes to icon file names
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
  return iconName
    ? `/_nuxt/assets/images/weather_icons/${iconName}.svg`
    : "/_nuxt/assets/images/weather_icons/unknown.svg";
}

// Fetch Seattle weather on mount
onMounted(() => {
  fetchWeather(city.value);
});
</script>

<style scoped></style>
