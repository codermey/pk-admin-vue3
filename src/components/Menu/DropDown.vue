<script setup lang="ts" generic="T extends { icon?: string | IconifyIcon }">
import type { IconifyIcon, IconProps } from '@iconify/vue'

const currentIndex = defineModel<number>({ default: 0 })

defineProps<{
  list: T[]
  iconProps?: Partial<IconProps>
  iconClass?: string
}>()

const emits = defineEmits<{
  change: [item: T, index: number]
}>()

const handleCommand = (command: { item: T; index: number }) => {
  currentIndex.value = command.index
  emits('change', command.item, command.index)
}
</script>

<template>
  <ElDropdown trigger="click" @command="handleCommand">
    <slot name="header"></slot>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="(item, index) in list"
          :key="index"
          :command="{ item, index }"
          :class="{ active: index === currentIndex }"
        >
          <div class="flex items-center gap-2">
            <Iconify v-if="item.icon" :icon="item.icon" v-bind="iconProps" :class="iconClass" />
            <slot name="item" :item="item"></slot>
          </div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item) {
  &.active {
    background-color: var(--el-dropdown-menuItem-hover-fill);
    color: var(--el-dropdown-menuItem-hover-color);
  }
}
</style>
