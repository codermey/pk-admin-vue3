<script setup lang="ts">
import { Icon, loadIcons } from '@iconify/vue'
import epIconData from './icon-ep.json'
import type { IconListProps } from './types'

const props = withDefaults(defineProps<IconListProps>(), {
  iconData: () => epIconData,
  collection: 'ep',
  itemClass: 'py-1',
  iconClass: 'text-xl',
  showText: false,
})
const emits = defineEmits(['click'])

const chooseIndex = ref<number>()

onBeforeMount(async () => {
  await loadIcons(props.iconData.map((icon) => `${props.collection}:${icon}`))
})

const handleClick = (icon: string, index: number) => {
  chooseIndex.value = index
  emits('click', icon, index)
}

function toPascalCase(str: string) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] border-l border-t">
    <li
      v-for="(icon, index) in iconData"
      :key="index"
      :class="[
        'flex flex-col cursor-pointer items-center justify-center border-b border-r hover:bg-sky-100',
        itemClass,
      ]"
      @click="handleClick(icon, index)"
    >
      <component
        :is="Icon"
        :icon="collection + ':' + icon"
        :class="[iconClass, index === chooseIndex && activeClass]"
      ></component>
      <span v-if="showText">{{ toPascalCase(icon) }}</span>
    </li>
  </ul>
</template>
