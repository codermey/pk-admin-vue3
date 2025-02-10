<script lang="ts" setup>
import FullScreen from '@/components/Themes/FullScreen.vue'
</script>

<template>
  <div class="text-teal-700">
    <h1 class="text-3xl font-bold">Home Page</h1>
    <RouterLink class="hover:underline" to="/about">Go to About Page</RouterLink>
    <IconfontIcon name="down-line" />
  </div>

  <DarkModeToggle dark-mode />

  <FullScreen />
</template>

<route lang="yaml">
meta:
  layout: default
</route>
