<script setup lang="ts">
import type { ThemeSettingsProps } from '../Themes/types'
import type { HeaderProps } from './types'

const collapsed = defineModel<boolean>('collapsed', { default: false })

const props = defineProps<HeaderProps>()

const emits = defineEmits<{
  menuCommand: [string | number | object]
  settingChange: [settings: ThemeSettingsProps]
}>()

const localSettings = ref({ ...props.settings })

const avatarMenuProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locales, settings, ...restProps } = props
  return restProps
})

watch(
  () => localSettings.value,
  () => {
    emits('settingChange', localSettings.value)
  },
  { deep: true },
)

const handleCommand = (command: string | number | object) => {
  emits('menuCommand', command)
}
const handleSettingChange = (settings: ThemeSettingsProps) => {
  localSettings.value = settings
}
const handleDarkModeChange = (darkMode: boolean) => {
  localSettings.value!.darkMode = darkMode
}
</script>

<template>
  <ElRow class="px-2" align="middle">
    <Iconify
      v-if="localSettings.menuMode !== 'top'"
      :icon="collapsed ? 'ep:expand' : 'ep:fold'"
      class="cursor-pointer text-xl"
      @click="collapsed = !collapsed"
    />
    <div class="flex-grow">
      <slot />
    </div>
    <ElRow align="middle">
      <ThemeSettings class="mr-4" v-bind="settings" @change="handleSettingChange" />
      <DarkModeToggle class="mr-4" :dark-mode="localSettings?.darkMode" @change="handleDarkModeChange" />
      <ChangeLocale :locales="locales" class="mr-4" />
      <FullScreen />
      <ElDivider direction="vertical" class="mx-4!" />
      <AvatarMenu v-if="username || src" v-bind="avatarMenuProps" @command="handleCommand" />
    </ElRow>
  </ElRow>
</template>

<style scoped></style>
