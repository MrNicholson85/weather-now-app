<template>
  <button @click="toggleSystem" class="unit-toggle">
    {{ system === "metric" ? "Metric (°C, km/h)" : "Imperial (°F, mph)" }}
  </button>
</template>

<script setup>
import { useMeasurementSystem } from "~/composables/useMeasurementSystem";
const { system, toggleSystem } = useMeasurementSystem();
</script>

<style scoped>
.unit-toggle {
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 600;
}
</style>
