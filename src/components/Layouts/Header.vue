<script setup lang="ts">
import type { ThemeSettingsProps } from '../Themes/types'
import type { HeaderProps } from './types'

const collapsed = defineModel<boolean>('collapsed', { default: false })

const props = defineProps<HeaderProps>()

const emits = defineEmits<{
  menuCommand: [string | number | object]
  settingChange: [settings: ThemeSettingsProps]
}>()

const localProps = reactive({ ...props })

const avatarMenuProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locales, settings, ...restProps } = props
  return restProps
})

watch(
  () => localProps.settings,
  () => {
    emits('settingChange', localProps.settings!)
  },
  { deep: true },
)

const handleCommand = (command: string | number | object) => {
  emits('menuCommand', command)
}
const handleSettingChange = (settings: ThemeSettingsProps) => {
  localProps.settings = settings
}
const handleDarkModeChange = (darkMode: boolean) => {
  localProps.settings!.darkMode = darkMode
}
</script>

<template>
  <ElRow class="px-2" align="middle">
    <Iconify
      :icon="collapsed ? 'ep:expand' : 'ep:fold'"
      class="cursor-pointer text-xl"
      @click="collapsed = !collapsed"
    />
    <div class="flex-grow">
      <slot />
    </div>
    <ElRow align="middle">
      <ThemeSettings class="mr-4" v-bind="settings" @change="handleSettingChange" />
      <DarkModeToggle class="mr-4" :dark-mode="localProps.settings?.darkMode" @change="handleDarkModeChange" />
      <ChangeLocale :locales="locales" class="mr-4" />
      <FullScreen />
      <ElDivider direction="vertical" class="mx-4!" />
      <AvatarMenu v-if="username || src" v-bind="avatarMenuProps" @command="handleCommand" />
    </ElRow>
  </ElRow>
</template>

<style scoped></style>
