import { ref, watch, onMounted } from "vue";

const unitSettings = ref({
  system: "metric", // 'metric' | 'imperial' | 'custom'
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
});

export function useUnitSettings() {
  function setUnit(type, value) {
    unitSettings.value[type] = value;

    // 🧠 If user changes any single category manually, mark as 'custom'
    if (type !== "system") {
      unitSettings.value.system = "custom";
    }
  }

  function setSystem(systemType) {
    unitSettings.value.system = systemType;

    if (systemType === "metric") {
      unitSettings.value.temperature = "celsius";
      unitSettings.value.windSpeed = "kmh";
      unitSettings.value.precipitation = "mm";
    } else if (systemType === "imperial") {
      unitSettings.value.temperature = "fahrenheit";
      unitSettings.value.windSpeed = "mph";
      unitSettings.value.precipitation = "in";
    }
  }

  // Load from localStorage
  onMounted(() => {
    const stored = localStorage.getItem("unitSettings");
    if (stored) {
      try {
        unitSettings.value = JSON.parse(stored);
      } catch (e) {
        console.warn("Failed to parse unit settings:", e);
      }
    }
  });

  // Save on change
  watch(
    unitSettings,
    (val) => {
      localStorage.setItem("unitSettings", JSON.stringify(val));
    },
    { deep: true }
  );

  return {
    unitSettings,
    setUnit,
    setSystem,
  };
}
