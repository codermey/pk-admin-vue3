<script setup lang="ts">
import NetIcon from './NetIcon.vue'
import type { NetIconProps } from './types'

const props = withDefaults(defineProps<NetIconProps>(), {
  url: '/font_4628337_594plpye98l.css',
  prefix: 'icon',
  fontFamily: 'iconfont',
})
</script>

<template>
  <NetIcon v-bind="props" />
</template>
