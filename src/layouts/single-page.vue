<script setup lang="ts">
const locales = ref([
  {
    text: '中文',
    name: 'zh-CN',
    icon: 'uil:letter-chinese-a',
  },
  {
    text: 'English',
    name: 'en',
    icon: 'ri:english-input',
  },
])
</script>

<template>
  <div class="relative">
    <div class="size-screen flex flex-col items-center justify-center">
      <RouterView />
    </div>
    <div class="absolute right-8 top-0 flex items-center gap-x-4">
      <DarkModeToggle />
      <ChangeLocale :locales="locales" />
    </div>
  </div>
</template>

<style scoped></style>
