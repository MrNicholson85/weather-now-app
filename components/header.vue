<template>
  <div>
    <header>
      <div>
        <a href="/"><img :src="logo" class="w-[137px] md:w-[200px]" /></a>
      </div>
      <div
        class="flex gap-[10px] w-[119px] bg-wnaNeutral800 rounded-lg px-4 py-3 justify-center text-base font-DMSansMedium"
      >
        <img :src="unitIcon" class="w-[16px]" />Units<img :src="chevron" />
      </div>
    </header>
  </div>
</template>
<script setup>
import logo from "~/public/images/wna-logo.svg";
import unitIcon from "~/public/images/icons/units-icon.svg";
import chevron from "~/public/images/icons/units-dropdown-icon.svg";
</script>
<style scoped>
header {
  @apply flex justify-between items-center mb-16;
}
</style>
