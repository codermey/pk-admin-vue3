<script lang="ts" setup>
definePage({
  meta: {
    title: '首页',
    icon: 'mdi:home',
  },
})
</script>

<template>
  <div class="text-teal-700">
    <h1 class="text-3xl font-bold">Home Page</h1>
    <RouterLink class="hover:underline" to="/about">Go to About Page</RouterLink>
    <IconfontIcon name="down-line" />
  </div>
</template>
