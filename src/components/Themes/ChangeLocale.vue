<script setup lang="ts">
import type { ChangeLocaleProps, LocaleItem } from './types'
import { loadLocaleMessages } from '@/modules/i18n'

const props = defineProps<ChangeLocaleProps>()
const emits = defineEmits<{
  change: [item: LocaleItem]
}>()

const currentIndex = ref(0)

const IconPropsComputed = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, iconClass, ...resetProps } = props
  return resetProps
})

const handleChange = (item: LocaleItem) => {
  loadLocaleMessages(item.name)
  emits('change', item)
}
</script>

<template>
  <DropDown
    v-model="currentIndex"
    :list="locales"
    :icon-props="IconPropsComputed"
    :icon-class="iconClass"
    @change="handleChange"
  >
    <template #header>
      <span>
        <Iconify icon="ion:language" class="cursor-pointer text-xl" v-bind="IconPropsComputed" :class="iconClass" />
      </span>
    </template>
    <template #item="{ item }">
      <span>{{ item.text }}</span>
    </template>
  </DropDown>
</template>

<style scoped></style>
