<script lang="ts" setup>
definePage({
  meta: {
    title: '关于我们',
    icon: 'mdi:information',
  },
})
</script>

<template>
  <div class="text-teal-700">
    <h1 class="text-3xl font-bold">About Page</h1>
    <RouterLink class="hover:underline" to="/">Go to Home Page</RouterLink>
  </div>
</template>
