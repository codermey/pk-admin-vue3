<script setup lang="ts">
definePage({
  meta: {
    title: 'pages.editor',
    icon: 'ep:edit',
  },
})

const options = ref({})
</script>

<template>
  <Editor :options="options" />
</template>

<style scoped></style>
