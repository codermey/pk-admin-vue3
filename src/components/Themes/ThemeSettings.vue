<script setup lang="ts">
import type { MenuModeType, ThemeSettingsProps } from './types'

const props = withDefaults(defineProps<ThemeSettingsProps>(), {
  themeColor: '#409eff',
  darkMode: false,
  menuWidth: 220,
  showLogo: false,
  switchAnimation: '',
  showTabs: true,
  showBreadcrumb: true,
  headerFixed: false,
  menuMode: 'siderbar',
  menuBackground: '#fff',
})
const emits = defineEmits<{
  change: [settings: ThemeSettingsProps]
}>()

const drawer = ref(false)

const settings = ref<ThemeSettingsProps>({ ...props })

onMounted(() => {
  emits('change', settings.value)
})

const handleMenuModeSwitch = (mode: MenuModeType) => {
  settings.value.menuMode = mode
}
const handleClose = () => {
  emits('change', settings.value)
}
</script>

<template>
  <Iconify icon="mdi:cog" class="cursor-pointer text-xl" v-bind="$attrs" @click="drawer = true" />
  <ElDrawer v-model="drawer" size="378" title="主题设置" @close="handleClose">
    <ElForm :model="settings">
      <ElFormItem label="主题颜色">
        <ElColorPicker v-model="settings.themeColor" />
      </ElFormItem>
      <ElFormItem label="暗黑模式">
        <ElSwitch v-model="settings.darkMode" />
      </ElFormItem>
      <ElFormItem label="导航模式" label-position="top">
        <div class="flex gap-x-4">
          <ElTooltip content="左侧菜单">
            <div
              class="menu-mode-item grid grid-flow-col grid-rows-4 gap-1"
              :class="{ active: settings.menuMode === 'siderbar' }"
              @click="handleMenuModeSwitch('siderbar')"
            >
              <div class="row-span-4 bg-indigo-600"></div>
              <div class="col-span-3 bg-gray-200"></div>
              <div class="col-span-3 row-span-3 bg-gray-200"></div>
            </div>
          </ElTooltip>
          <ElTooltip content="顶部左侧菜单混合">
            <div
              class="menu-mode-item"
              :class="{ active: settings.menuMode === 'mix' }"
              @click="handleMenuModeSwitch('mix')"
            >
              <div class="col-span-4 row-span-1 bg-indigo-600"></div>
              <div class="row-span-3 bg-gray-200"></div>
              <div class="col-span-3 row-span-3 bg-gray-200"></div>
            </div>
          </ElTooltip>
          <ElTooltip content="顶部菜单">
            <div
              class="menu-mode-item"
              :class="{ active: settings.menuMode === 'top' }"
              @click="handleMenuModeSwitch('top')"
            >
              <div class="row-span-1 bg-indigo-600"></div>
              <div class="row-span-3 bg-gray-200"></div>
            </div>
          </ElTooltip>
          <ElTooltip content="左侧菜单混合">
            <div
              class="menu-mode-item"
              :class="{ active: settings.menuMode === 'mixbar' }"
              @click="handleMenuModeSwitch('mixbar')"
            >
              <div class="col-span-4 bg-gray-200"></div>
              <div class="row-span-3 bg-indigo-600"></div>
              <div class="col-span-3 row-span-3 bg-gray-200"></div>
            </div>
          </ElTooltip>
        </div>
      </ElFormItem>
      <ElFormItem label="菜单背景">
        <ElColorPicker v-model="settings.menuBackground" />
      </ElFormItem>
      <ElFormItem label="菜单宽度">
        <ElSlider
          v-model="settings.menuWidth"
          size="small"
          class="ml-3!"
          :max="600"
          :min="180"
          show-input
          input-size="small"
        />
      </ElFormItem>
      <ElFormItem label="显示Logo">
        <ElSwitch v-model="settings.showLogo" />
      </ElFormItem>
      <ElFormItem label="切换动画">
        <ElSelect v-model="settings.switchAnimation" placeholder="请选择切换动画"></ElSelect>
      </ElFormItem>
      <ElFormItem label="标签页"> <ElSwitch v-model="settings.showTabs" /> </ElFormItem>
      <ElFormItem label="头部固定">
        <ElSwitch v-model="settings.headerFixed" />
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<style scoped lang="scss">
:deep(.el-form-item__content) {
  justify-content: flex-end;
}

.menu-mode-item {
  @apply relative h-15 w-18 cursor-pointer overflow-hidden border rounded p-1 grid grid-flow-col grid-rows-4 gap-1;
  &.active {
    @apply border-indigo-600;
  }
}
</style>
