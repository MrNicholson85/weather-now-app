<template>
  <div>
    <header role="banner">
      <div>
        <a href="/">
          <span v-if="theme !== 'dark'"
            ><img
              :src="logoDark"
              class="w-[137px] md:w-[200px]"
              title="Weather Now Logo"
          /></span>
          <span v-else>
            <img
              :src="logo"
              class="w-[137px] md:w-[200px]"
              title="Weather Now Logo"
            />
          </span>
        </a>
      </div>
      <div class="flex gap-4 items-center">
        <ThemeSwitcher />
        <UnitSettings />
      </div>
    </header>
  </div>
</template>
<script setup>
import logo from "~/public/images/wna_logo.svg";
import logoDark from "~/public/images/wna_logo_dark.svg";
import unitIcon from "~/public/images/icons/units-icon.svg";
import chevron from "~/public/images/icons/units-dropdown-icon.svg";
import UnitSettiungs from "~/components/UnitSettings.vue";
import { useTheme } from "~/composables/useTheme";
const { theme, toggleTheme } = useTheme();
</script>
<style scoped>
header {
  @apply flex justify-between items-center mb-16;
}
</style>
