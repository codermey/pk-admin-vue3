<script lang="ts" setup>
import { useMenu } from './useMenu'
import type { IconOptions, SubMenuProps } from './types'

const props = defineProps<SubMenuProps>()

const iconProps = inject('iconProps') as IconOptions

const { getIndex, menuHasChildren } = useMenu()

const subAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, ...resetProps } = props
  return resetProps
})
</script>

<template>
  <MenuItem v-if="!menuHasChildren(data)" :data="data" :collapse="collapse" />
  <ElSubMenu v-else :index="getIndex(data)" :disabled="data.meta?.disabled">
    <template v-if="!data.meta?.icon" #title>{{ $t(data.meta?.title || '') }}</template>
    <template v-else #title>
      <Iconify :icon="data.meta?.icon!" :style="iconProps?.style" :class="iconProps?.class" />
      <span>{{ $t(data.meta?.title || '') }}</span>
    </template>
    <SubMenu v-for="child in data.children" :key="`${data.path}/${child.path}`" v-bind="subAttrs" :data="child" />
  </ElSubMenu>
</template>
