<template>
  <div class="unit-settings-wrapper relative inline-block text-left">
    <!-- Trigger -->
    <button
      ref="triggerEl"
      type="button"
      class="trigger inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white dark:bg-gray-700 border hover:shadow-sm"
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      :aria-expanded="isOpen.toString()"
      aria-haspopup="menu"
    >
      ⚙️ Unit settings
      <span class="chev" aria-hidden="true">▾</span>
    </button>

    <!-- Dropdown Panel -->
    <div
      v-show="isOpen"
      ref="panelEl"
      class="dropdown-panel mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg z-50"
      role="menu"
      aria-label="Unit settings"
      @keydown.esc.prevent="closeDropdown"
    >
      <div class="space-y-6">
        <!-- 🌐 Master Unit System Switch -->
        <div>
          <label class="block font-bold mb-2">🌍 Unit System</label>
          <div class="options" role="tablist" aria-label="Unit system">
            <button
              v-for="opt in systemOptions"
              :key="opt.value"
              type="button"
              class="option"
              :class="{ 'option--active': unitSettings.system === opt.value }"
              @click="setSystem(opt.value)"
              :aria-pressed="unitSettings.system === opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Individual Controls -->
        <div>
          <label class="block font-bold mb-2">🌡 Temperature</label>
          <div class="options" role="tablist" aria-label="Temperature unit">
            <button
              v-for="opt in temperatureOptions"
              :key="opt.value"
              type="button"
              class="option"
              :class="{
                'option--active': unitSettings.temperature === opt.value,
              }"
              @click="save('temperature', opt.value)"
              :aria-pressed="unitSettings.temperature === opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block font-bold mb-2">💨 Wind Speed</label>
          <div class="options" role="tablist" aria-label="Wind speed unit">
            <button
              v-for="opt in windOptions"
              :key="opt.value"
              type="button"
              class="option"
              :class="{
                'option--active': unitSettings.windSpeed === opt.value,
              }"
              @click="save('windSpeed', opt.value)"
              :aria-pressed="unitSettings.windSpeed === opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block font-bold mb-2">🌧 Precipitation</label>
          <div class="options" role="tablist" aria-label="Precipitation unit">
            <button
              v-for="opt in precipOptions"
              :key="opt.value"
              type="button"
              class="option"
              :class="{
                'option--active': unitSettings.precipitation === opt.value,
              }"
              @click="save('precipitation', opt.value)"
              :aria-pressed="unitSettings.precipitation === opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useUnitSettings } from "~/composables/useUnitSettings";
const { unitSettings, setUnit, setSystem } = useUnitSettings();

function save(type, value) {
  setUnit(type, value);
}

const systemOptions = [
  { value: "metric", label: "Metric (°C, km/h, mm)" },
  { value: "imperial", label: "Imperial (°F, mph, in)" },
  { value: "custom", label: "Custom" },
];

const temperatureOptions = [
  { value: "celsius", label: "Celsius (°C)" },
  { value: "fahrenheit", label: "Fahrenheit (°F)" },
];

const windOptions = [
  { value: "kmh", label: "Kilometers/hour (km/h)" },
  { value: "mph", label: "Miles/hour (mph)" },
];

const precipOptions = [
  { value: "mm", label: "Millimeters (mm)" },
  { value: "in", label: "Inches (in)" },
];

// Dropdown state + handlers
const isOpen = ref(false);
const panelEl = ref(null);
const triggerEl = ref(null);

function openDropdown() {
  isOpen.value = true;
  // focus first focusable in panel for keyboard users
  setTimeout(() => {
    const btn = panelEl.value?.querySelector("button.option");
    if (btn) btn.focus();
  }, 0);
}

function closeDropdown() {
  isOpen.value = false;
  triggerEl.value?.focus();
}

function toggleDropdown() {
  isOpen.value ? closeDropdown() : openDropdown();
}

function onDocumentClick(e) {
  const panel = panelEl.value;
  const trigger = triggerEl.value;
  if (!panel || !trigger) return;
  if (panel.contains(e.target) || trigger.contains(e.target)) {
    return;
  }
  closeDropdown();
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onDocKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onDocKeyDown);
});

function onDocKeyDown(e) {
  if (e.key === "Escape" && isOpen.value) {
    closeDropdown();
  }
}
</script>

<style scoped>
.unit-settings-wrapper {
  display: inline-block;
}

/* Trigger */
.trigger {
  min-width: 160px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: inherit;
  font-weight: 600;
}
.trigger:focus {
  outline: 3px solid rgba(59, 130, 246, 0.25);
  outline-offset: 3px;
}

/* Panel */
.dropdown-panel {
  min-width: 320px;
}

/* reuse existing option styles */
.options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.option {
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  background: white;
  color: black;
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: background 0.12s, transform 0.06s;
  min-width: 120px;
  text-align: center;
}

.option:focus {
  outline: 3px solid rgba(59, 130, 246, 0.3);
  outline-offset: 2px;
}

.option:active {
  transform: translateY(1px);
}

.option--active {
  background: #2563eb; /* blue-600 */
  color: white;
  border-color: transparent;
}

.dark .option {
  background: #1f2937;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.dark .option--active {
  background: #2563eb;
  color: white;
}
</style>
