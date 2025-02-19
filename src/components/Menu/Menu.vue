<script lang="ts" setup>
import { useMenu } from './useMenu'
import type { MenuProps } from './types'

const props = withDefaults(defineProps<MenuProps>(), {
  backgroundColor: 'transparent',
  menus: () => [],
  iconProps: () => ({
    style: {
      marginRight: '10px',
      fontSize: '18px',
    },
  }),
})

provide('iconProps', props.iconProps)

const slots = useSlots()
const { generateMenuKey } = useMenu()

const filterMenus = computed(() => generateMenuKey(props.menus))

const menuProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { menus, subMenuProps, ...restProps } = props
  return restProps
})
</script>

<template>
  <ElMenu v-bind="menuProps" :style="{ '--el-menu-bg-color': backgroundColor }">
    <slot name="icon"></slot>
    <div v-if="slots.icon" class="flex-grow"></div>
    <SubMenu v-for="menu in filterMenus" :key="menu.path" :data="menu" v-bind="subMenuProps" :collapse="collapse" />
  </ElMenu>
</template>
