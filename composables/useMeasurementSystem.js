// composables/useMeasurementSystem.js
import { ref, watch, onMounted } from "vue";

const system = ref("metric"); // Default value

export function useMeasurementSystem() {
  function toggleSystem() {
    system.value = system.value === "metric" ? "imperial" : "metric";
  }

  // 🧠 On first load: restore from localStorage (if exists)
  onMounted(() => {
    const stored = localStorage.getItem("unitSystem");
    if (stored === "metric" || stored === "imperial") {
      system.value = stored;
    }
  });

  // 💾 Whenever it changes: save to localStorage
  watch(system, (newVal) => {
    localStorage.setItem("unitSystem", newVal);
  });

  return {
    system,
    toggleSystem,
  };
}
