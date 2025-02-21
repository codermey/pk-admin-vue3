<script setup lang="ts">
import type { HeaderProps } from './types'

const props = withDefaults(defineProps<HeaderProps>(), {
  collapsed: false,
})

const emits = defineEmits<{
  command: [string | number | object]
}>()

const handleCommand = (command: string | number | object) => {
  emits('command', command)
}

const avatarMenuProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { collapsed, locales, ...restProps } = props
  return restProps
})
</script>

<template>
  <ElRow class="px-2" align="middle">
    <Iconify :icon="collapsed ? 'ep:expand' : 'ep:fold'" class="cursor-pointer text-xl" />
    <div class="flex-grow" />
    <ElRow align="middle">
      <DarkModeToggle class="mr-4" />
      <ChangeLocale :locales="locales" class="mr-4" />
      <FullScreen />
      <ElDivider direction="vertical" class="mx-4!" />
      <AvatarMenu v-if="username || src" v-bind="avatarMenuProps" @command="handleCommand" />
    </ElRow>
  </ElRow>
</template>

<style scoped></style>
