<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    default: 'i',
  },
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <component
    :is="tag"
    :class="[isFullscreen ? 'i-ri:fullscreen-exit-fill' : 'i-ep:full-screen', 'cursor-pointer text-xl']"
    @click="toggle"
  />
</template>

<style scoped></style>
