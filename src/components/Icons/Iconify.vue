<script lang="ts" setup>
import { Icon, type IconProps } from '@iconify/vue'

const props = defineProps<IconProps>()
</script>

<template>
  <component :is="Icon" v-bind="props"></component>
</template>

<style scoped></style>
