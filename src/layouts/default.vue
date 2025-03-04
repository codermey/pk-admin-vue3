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

const router = useRouter()
const { getSubMenus, getTopMenus } = useMenu()

// 是否移动端
const isMobile = ref(false)
// 是否折叠菜单
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

const settings = computed(() => themeSetting.value.settings)

const menus = computed(() => generateMenuData(routes))
const mixbarMenus = computed(() => (settings.value?.menuMode === 'mixbar' ? getTopMenus(menus.value) : menus.value))
const mixMenus = computed(() => (settings.value?.menuMode === 'mix' ? getTopMenus(menus.value) : menus.value))

// 判断二级菜单的顶级是否所有的菜单项都设置了icon
const isFullIcon = computed(() => getSubMenus(menus.value).every((menu) => !!menu.meta?.icon))

// 菜单宽度
const menuWidth = computed(() => (settings.value?.menuWidth ? settings.value.menuWidth + 'px' : '240px'))
// mixbar 菜单宽度
const mixbarMenuWidth = computed(() => {
  if (isMobile.value) return '0px'
  if (settings.value?.menuMode === 'mixbar' && isFullIcon.value) {
    return collapsed.value ? 'auto' : menuWidth.value
  } else {
    return collapsed.value ? '64px' : menuWidth.value
  }
})

const tmpWidth = ref(0)
const changeWidthFlag = ref(false)
useResizeObserver(document.body, (entries) => {
  const { width } = entries[0].contentRect
  if (tmpWidth.value === 0) {
    tmpWidth.value = width
  }

  if (width > tmpWidth.value) {
    // 扩大屏幕
    changeWidthFlag.value = width < 640
  } else {
    // 缩小屏幕
    changeWidthFlag.value = width > 1200
  }

  if (width < 640 && !changeWidthFlag.value) {
    collapsed.value = true
  }
  if (width > 1200 && !changeWidthFlag.value) {
    collapsed.value = false
  }
  isMobile.value = width < 440
  tmpWidth.value = width
})

onBeforeMount(() => {
  // 是否为移动端
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    )
  ) {
    isMobile.value = true
    collapsed.value = true
  }
})

const handleSettingChange = (settings: ThemeSettingsProps) => {
  themeSetting.value.settings = settings
}

const handleMenuSelect = (item: AppRouteMenuItem) => {
  isMobile.value && (collapsed.value = true)
  router.push(item.name as string)
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
      class="h-full shrink-0 border-r bg-white transition-width"
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
            :class="{ mixbar: settings?.menuMode === 'mixbar' }"
            :menus="mixbarMenus"
            class="border-r-none!"
            :collapse="settings?.menuMode !== 'mixbar' && collapsed"
            :background-color="settings?.menuMode !== 'mixbar' ? settings?.menuBackground : 'transparent'"
            @select="handleMenuSelect"
          />
        </ElScrollbar>
        <!-- 二级菜单 -->
        <ElScrollbar v-if="settings?.menuMode === 'mix' || settings?.menuMode === 'mixbar'" class="flex-1">
          <Menu
            :menus="getSubMenus(menus)"
            class="border-r-none!"
            :collapse="collapsed"
            :background-color="settings?.menuBackground"
            @select="handleMenuSelect"
          />
        </ElScrollbar>
      </ElRow>
    </div>

    <div class="h-full w-full">
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
          @select="handleMenuSelect"
        />
      </Header>
      <RouterView />
    </div>
  </div>

  <ElDrawer
    v-if="isMobile"
    :model-value="!collapsed"
    direction="ltr"
    size="100%"
    header-class="mb-0!"
    body-class="p-0!"
    :style="{ backgroundColor: settings?.menuBackground }"
    @close="collapsed = true"
  >
    <Menu
      :menus="menus"
      class="h-full border-r-none!"
      :background-color="settings?.menuBackground"
      @select="handleMenuSelect"
    />
  </ElDrawer>
</template>

<style scoped lang="scss">
.mixbar {
  :deep(.el-menu-item) {
    flex-direction: column;
    align-items: center;
    padding: 4px 0 !important;
    margin-top: 14px;
    height: auto;
    line-height: unset !important;

    svg {
      margin-right: 0;
      margin-bottom: 8px;
    }
  }
}
</style>
