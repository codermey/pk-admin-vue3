<script setup lang="ts">
import type { ChangeLocaleProps } from './types'

const props = defineProps<ChangeLocaleProps>()

const IconPropsComputed = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, iconClass, ...resetProps } = props
  return resetProps
})
</script>

<template>
  <ElDropdown trigger="click">
    <span>
      <Iconify icon="ion:language" class="cursor-pointer text-xl" v-bind="IconPropsComputed" :class="iconClass" />
    </span>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="(locale, index) in locales" :key="index" :command="locale.name">
          <div class="flex items-center gap-2">
            <Iconify :icon="locale.icon" v-bind="IconPropsComputed" :class="iconClass" />
            <span>{{ locale.text }}</span>
          </div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped></style>
