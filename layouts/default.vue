<template>
  <div class="wna-wrapper">
    <Header />

    <main role="main">
      <slot />
    </main>
  </div>
</template>
<script setup>
import Header from "~/components/header.vue";
</script>
