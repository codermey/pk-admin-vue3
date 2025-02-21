<script setup lang="ts">
import type { AvatarMenuProps } from './types'

const props = withDefaults(defineProps<AvatarMenuProps>(), {
  trigger: 'click',
  size: 'small',
})
const emits = defineEmits<{
  command: [string | number | object]
}>()

const handleCommand = (command: string | number | object) => {
  emits('command', command)
}
</script>

<template>
  <ElDropdown v-bind="props" :size="menuSize" @command="handleCommand">
    <span class="flex items-center gap-x-2">
      <ElAvatar :size="size" :alt="alt" :src="src" :fit="fit" :src-set="srcSet" :shape="shape" :icon="icon">
        {{ username?.[0].toLocaleUpperCase() }}
      </ElAvatar>
      <span v-if="username">{{ username }}</span>
    </span>
    <template #dropdown>
      <ElDropdownMenu>
        <template v-for="(menu, index) in data" :key="index">
          <ElDivider v-if="typeof menu === 'object' && menu.key === 'divider'" class="my-0!" />
          <ElDropdownItem v-else :command="typeof menu === 'object' ? menu.key : menu">
            {{ typeof menu === 'object' ? menu.value : menu }}
          </ElDropdownItem>
        </template>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped></style>
