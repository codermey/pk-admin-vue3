<script setup lang="ts">
const route = useRoute()

const bgImage = ref('')

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

onBeforeMount(() => {
  if (route.meta?.backgroundImage) {
    bgImage.value = route.meta.backgroundImage as string
  }
})
</script>

<template>
  <div class="size-screen overflow-hidden">
    <div class="mx-60 h-screen flex flex-col items-center justify-center">
      <RouterView />
    </div>
    <div
      class="fixed left-0 top-0 h-screen w-1/2 bg-primary-5 bg-cover bg-center -z-1 lt-lg:w-full"
      :style="{ backgroundImage: `url(${bgImage})` }"
    ></div>
    <div class="absolute right-8 top-0 flex items-center gap-x-4">
      <DarkModeToggle />
      <ChangeLocale :locales="locales" />
    </div>
  </div>
</template>

<style scoped></style>
