<script lang="ts" setup>
import { addUnit } from '@/utils'
import { routes } from 'vue-router/auto-routes'
import type { AppRouteMenuItem } from '@/components/Menu/types'
import type { RouteRecordRaw } from 'vue-router/auto'

interface ThemeSetting {
  menuWidth: number | string
}

withDefaults(defineProps<ThemeSetting>(), {
  menuWidth: 240,
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
    <div class="h-full bg-sky-100" :style="{ width: addUnit(menuWidth) }">
      <ElScrollbar>
        <Menu :menus="menus" />
      </ElScrollbar>
    </div>

    <div class="flex-1">
      <div class="header"></div>
      <RouterView />
    </div>
  </div>
</template>
