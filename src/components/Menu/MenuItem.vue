<script setup lang="ts">
import { useMenu } from './useMenu'
import type { IconOptions, MenuItemProps } from './types'

defineProps<MenuItemProps>()

const iconProps = inject('iconProps') as IconOptions

const { getIndex } = useMenu()
</script>

<template>
  <!-- 单个item -->
  <ElMenuItem v-if="!data.meta?.icon" :index="getIndex(data)">{{ $t(data.meta?.title || '') }}</ElMenuItem>
  <template v-else>
    <!-- 侧栏 -->
    <ElMenuItem v-if="!collapse" :index="getIndex(data)">
      <iconify :icon="data.meta.icon" :style="iconProps?.style" :class="iconProps?.class" />
      <span>{{ $t(data.meta?.title || '') }}</span>
    </ElMenuItem>
    <!-- 折叠 -->
    <ElMenuItem v-else :index="getIndex(data)">
      <Iconify :icon="data.meta.icon" :style="iconProps?.style" :class="iconProps?.class" />
      <template #title>{{ $t(data.meta?.title || '') }}</template>
    </ElMenuItem>
  </template>
</template>

<style scoped></style>
