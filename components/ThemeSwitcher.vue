<template>
  <button @click="toggleTheme" class="theme-btn">
    <span v-if="theme !== 'dark'" class="flex items-center gap-3"
      ><img :src="sunIcon" class="w-[20px] h-[20px]" /> Light Mode</span
    >
    <span v-else class="flex items-center gap-3"
      ><img :src="moonIcon" class="w-[20px] h-[20px]" /> Dark Mode</span
    >
  </button>
</template>

<script setup>
import { useTheme } from "~/composables/useTheme";
import moonIcon from "~/public/images/icons/moon-regular-full.svg";
import sunIcon from "~/public/images/icons/sun-regular-full.svg";
const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-btn {
  @apply cursor-pointer
  ease-in-out
  duration-200
  bg-blue500
  hover:bg-blue700
  dark:bg-wnaNeutral800
  dark:hover:bg-wnaNeutral700 
    rounded-[8px] 
    font-DMSansMedium 
    text-base 
    px-4 
    py-2
    text-wnaNeutral0;
}
</style>
