<template>
  <div class="wna-wrapper">
    <Header />

    <div>
      <slot />
    </div>
  </div>
</template>
<script setup>
import Header from "~/components/header.vue";
</script>
