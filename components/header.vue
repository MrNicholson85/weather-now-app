<template>
  <div>
    <header role="banner">
      <div>
        <a href="/"
          ><img
            :src="logo"
            class="w-[137px] md:w-[200px]"
            title="Weather Now Logo"
        /></a>
      </div>
      <UnitSettings />
    </header>
  </div>
</template>
<script setup>
import logo from "~/public/images/wna_logo.svg";
import unitIcon from "~/public/images/icons/units-icon.svg";
import chevron from "~/public/images/icons/units-dropdown-icon.svg";
import UnitSettiungs from "~/components/UnitSettings.vue";
</script>
<style scoped>
header {
  @apply flex justify-between items-center mb-16;
}
</style>
