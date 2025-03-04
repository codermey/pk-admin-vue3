<script setup lang="ts">
import { useMenu } from './useMenu'
import type { IconOptions, MenuItemProps } from './types'

defineProps<MenuItemProps>()

const iconProps = inject('iconProps') as IconOptions

const { getIndex } = useMenu()
</script>

<template>
  <ElMenuItem v-if="!data.meta?.icon" :index="getIndex(data)">{{ $t(data.meta?.title || '') }}</ElMenuItem>
  <template v-else>
    <ElMenuItem v-if="!collapse" :index="getIndex(data)">
      <iconify :icon="data.meta.icon" :style="iconProps?.style" :class="iconProps?.class" />
      <span>{{ $t(data.meta?.title || '') }}</span>
    </ElMenuItem>
    <ElMenuItem v-else :index="getIndex(data)">
      <Iconify :icon="data.meta.icon" :style="iconProps?.style" :class="iconProps?.class" />
      <template #title>{{ $t(data.meta?.title || '') }}</template>
    </ElMenuItem>
  </template>
</template>

<style scoped></style>
