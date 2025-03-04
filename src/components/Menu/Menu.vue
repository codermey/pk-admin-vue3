<script lang="ts" setup>
import { useMenu } from './useMenu'
import type { MenuInstance } from 'element-plus'
import type { AppRouteMenuItem, MenuCloseEmitType, MenuOpenEmitType, MenuProps, MenuSelectEmitType } from './types'

const props = withDefaults(defineProps<MenuProps>(), {
  backgroundColor: 'transparent',
  menus: () => [],
  iconProps: () => ({
    class: 'text-lg mr-2',
  }),
  ellipsis: true,
})

const emits = defineEmits<{
  select: [item: AppRouteMenuItem]
  close: MenuCloseEmitType
  open: MenuOpenEmitType
}>()

const slots = useSlots()

const { generateMenuKey, getMenuItem, getParentMenu, getActiveMenu } = useMenu()

const menuRef = ref<MenuInstance>()

const menuActiveIndex = ref('')

const iconProps = computed(() => (props.collapse ? { ...props.iconProps, class: 'text-lg' } : props.iconProps))
const filterMenus = computed(() => generateMenuKey(props.menus))

const menuProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { menus, subMenuProps, ...restProps } = props
  return restProps
})

onMounted(() => {
  const parenItem = getParentMenu(filterMenus.value)
  if (parenItem && parenItem.meta?.key) {
    !props.collapse && menuRef.value?.open(parenItem.meta.key as string)
  }

  const activeMenu = getActiveMenu(filterMenus.value)
  if (activeMenu && activeMenu.meta?.key) {
    menuActiveIndex.value = activeMenu.meta.key as string
  }
})

const handleSelect = (...args: MenuSelectEmitType) => {
  const [key] = args
  const menuItem = getMenuItem(filterMenus.value, key)
  if (!menuItem) return
  emits('select', menuItem)
}

const handleOpen = (...args: MenuOpenEmitType) => {
  emits('open', ...args)
}

const handleClose = (...args: MenuCloseEmitType) => {
  emits('close', ...args)
}

provide('iconProps', iconProps)
</script>

<template>
  <ElMenu
    ref="menuRef"
    v-bind="menuProps"
    :default-active="menuActiveIndex"
    :style="{ '--el-menu-bg-color': backgroundColor }"
    @select="handleSelect"
    @open="handleOpen"
    @close="handleClose"
  >
    <slot name="icon"></slot>
    <div v-if="slots.icon" class="flex-grow"></div>
    <SubMenu v-for="menu in filterMenus" :key="menu.path" :data="menu" v-bind="subMenuProps" :collapse="collapse" />
  </ElMenu>
</template>
