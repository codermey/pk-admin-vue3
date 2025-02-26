<script lang="ts" setup>
import { darken } from '@/utils'
import { routes } from 'vue-router/auto-routes'
import { useMenu } from '@/components/Menu/useMenu'
import type { AppRouteMenuItem } from '@/components/Menu/types'
import type { RouteRecordRaw } from 'vue-router/auto'
import type { DropdownMenuItem } from '@/components/Avatar/types'
import type { HeaderProps } from '@/components/Layouts/types'
import type { ThemeSettingsProps } from '@/components/Themes/types'

interface ThemeSettingOptions extends HeaderProps {
  menuWidth: number
  username: string
  avatar: string
  avatarMenus: DropdownMenuItem[]
}

const { getSubMenus, getTopMenus } = useMenu()

const collapsed = ref(false)

const themeSetting = ref<ThemeSettingOptions>({
  menuWidth: 240,
  username: 'codermey',
  avatar: '',
  avatarMenus: [],
  locales: [
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
const settings = computed(() => themeSetting.value.settings)
// 菜单宽度
const menuWidth = computed(() => (settings.value?.menuWidth ? settings.value.menuWidth + 'px' : '240px'))
// 判断二级菜单的顶级是否所有的菜单项都设置了icon
const isFullIcon = computed(() => getSubMenus(menus.value).every((menu) => !!menu.meta?.icon))
// mixbar 菜单宽度
const mixbarMenuWidth = computed(() => {
  if (settings.value?.menuMode === 'mixbar' && isFullIcon.value) {
    return collapsed.value ? 'auto' : menuWidth.value
  } else {
    return collapsed.value ? '64px' : menuWidth.value
  }
})
const mixbarMenus = computed(() => (settings.value?.menuMode === 'mixbar' ? getTopMenus(menus.value) : menus.value))
const mixMenus = computed(() => (settings.value?.menuMode === 'mix' ? getTopMenus(menus.value) : menus.value))

console.log('mixMenus', mixMenus.value)

const handleSettingChange = (settings: ThemeSettingsProps) => {
  themeSetting.value.settings = settings
}

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
    <div
      v-if="settings?.menuMode !== 'top'"
      class="h-full border-r bg-white transition-width"
      :style="{ width: mixbarMenuWidth, backgroundColor: settings?.menuBackground }"
    >
      <ElRow class="h-full">
        <ElScrollbar
          v-if="settings?.menuMode !== 'mix'"
          :class="settings?.menuMode !== 'mixbar' ? 'flex-1' : 'w-[64px]'"
          :style="{
            backgroundColor: settings?.menuMode !== 'mixbar' ? 'auto' : darken(settings.menuBackground!, 0.2),
          }"
        >
          <Menu
            v-if="settings?.menuMode === 'siderbar' || settings?.menuMode === 'mixbar'"
            :class="{ minbar: settings?.menuMode === 'mixbar' }"
            :menus="mixbarMenus"
            class="border-r-none!"
            :collapse="settings?.menuMode !== 'mixbar' && collapsed"
            :background-color="settings?.menuMode !== 'mixbar' ? settings?.menuBackground : 'transparent'"
          />
        </ElScrollbar>
        <!-- 二级菜单 -->
        <ElScrollbar v-if="settings?.menuMode === 'mix' || settings?.menuMode === 'mixbar'" class="flex-1">
          <Menu
            :menus="getSubMenus(menus)"
            class="border-r-none!"
            :collapse="collapsed"
            :background-color="settings?.menuBackground"
          />
        </ElScrollbar>
      </ElRow>
    </div>

    <div class="flex-1">
      <Header
        v-model:collapsed="collapsed"
        :locales="themeSetting.locales"
        :username="themeSetting.username"
        :avatar="themeSetting.avatar"
        :data="themeSetting.avatarMenus"
        :settings="settings"
        @setting-change="handleSettingChange"
      >
        <!-- 顶部菜单 -->
        <Menu
          v-if="settings?.menuMode === 'top' || settings?.menuMode === 'mix'"
          :menus="mixMenus"
          class="border-b-none!"
          mode="horizontal"
        />
      </Header>
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.minbar {
  :deep(.el-menu-item) {
    padding: 4px 0 !important;
    margin-top: 14px;
    height: auto;
    line-height: unset !important;
    flex-direction: column;
    svg {
      margin-bottom: 8px;
    }
  }
}
</style>
