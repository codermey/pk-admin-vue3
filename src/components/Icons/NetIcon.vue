<script setup lang="ts">
import type { NetIconProps } from './types'

const props = withDefaults(defineProps<NetIconProps>(), {
  url: '//at.alicdn.com/t/c/font_4628337_594plpye98l.css',
  prefix: 'icon',
  fontFamily: 'iconfont',
})

const symbolId = computed(() => `${props.fontFamily} ${props.prefix}-${props.name}`)

onMounted(() => {
  const existLink = document.querySelector(`link[href="${props.url}"]`)
  if (existLink) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = props.url
  document.head.appendChild(link)
})
</script>

<template>
  <i :class="symbolId"></i>
</template>
