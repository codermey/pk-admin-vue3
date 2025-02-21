<script lang="ts" setup>
import { addUnit } from '@/utils'
import { routes } from 'vue-router/auto-routes'
import type { AppRouteMenuItem } from '@/components/Menu/types'
import type { RouteRecordRaw } from 'vue-router/auto'
import type { LocaleItem } from '@/components/Themes/types'
import type { DropdownMenuItem } from '@/components/Avatar/types'

interface ThemeSetting {
  menuWidth?: number | string
  locales?: LocaleItem[]
  username: string
  avatar: string
  avatarMenus: DropdownMenuItem[]
}

withDefaults(defineProps<ThemeSetting>(), {
  menuWidth: 240,
  locales: () => [
    {
      text: '中文',
      name: 'zh-CN',
      icon: 'uil:letter-chinese-a',
    },
    {
      text: 'English',
      name: 'en',
      icon: 'ri:english-input',
    },
  ],
})

const menus = computed(() => generateMenuData(routes))

function generateMenuData(routes: RouteRecordRaw[]): AppRouteMenuItem[] {
  const menus: AppRouteMenuItem[] = []
  routes.forEach((route) => {
    const menuItem: AppRouteMenuItem = {
      name: route.name,
      path: route.path,
      meta: route.meta,
      alias: typeof route.redirect === 'string' ? route.redirect : undefined,
      component: route.component,
    }
    if (route.children && Array.isArray(route.children) && route.children.length) {
      menuItem.children = generateMenuData(route.children)
    }
    menus.push(menuItem)
  })
  return menus
}
</script>

<template>
  <div class="h-screen w-full flex">
    <div class="h-full border-r bg-white dark:(border-gray-700 bg-zinc-900)" :style="{ width: addUnit(menuWidth) }">
      <ElScrollbar>
        <Menu :menus="menus" class="border-r-none!" />
      </ElScrollbar>
    </div>

    <div class="flex-1">
      <Header :locales="locales" :username="username" :avatar="avatar" :data="avatarMenus" />
      <RouterView />
    </div>
  </div>
</template>
