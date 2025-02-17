<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { CSSProperties } from 'vue'
import type { NotificationProps } from './types'

const props = withDefaults(defineProps<NotificationProps>(), {
  icon: 'ep:bell',
  scale: 1,
})

const iconStyle = computed<CSSProperties>(() => {
  return {
    fontSize: props.iconSize ? `${props.iconSize}px` : '16px',
    color: props.iconColor || '#333',
  }
})
const badgeColor = computed(() => props.color || 'var(--el-color-danger)')
const badgeSize = computed(() => (props.size ? props.size + 'px' : 'var(--el-badge-font-size)'))
const translateX = computed(() => calculateTranslateX(props.scale) + '%')

function calculateTranslateX(scale: number) {
  // 定义scale和translateX的范围
  const minScale = 0.4
  const maxScale = 1
  const minTranslateX = 75
  const maxTranslateX = 100

  // 计算translateX
  const translateX = minTranslateX + (maxTranslateX - minTranslateX) * ((scale - minScale) / (maxScale - minScale))

  return Math.floor(translateX)
}
</script>

<template>
  <el-badge :value="12" class="item">
    <slot>
      <Icon icon="ep:bell" :style="iconStyle" />
    </slot>
  </el-badge>
</template>

<style scoped lang="scss">
:deep(.el-badge__content) {
  font-size: v-bind(badgeSize);
  background-color: v-bind(badgeColor);
  transform: translateY(-50%) translateX(v-bind(translateX)) scale(v-bind(scale));
}
</style>
