<script lang="ts" setup>
import type { Language } from 'element-plus/es/locale/index.mjs'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'

const { messages, locale } = useI18n()

const elLocale = computed(() => messages.value[locale.value] as Language)
</script>

<template>
  <el-config-provider :locale="elLocale">
    <RouterView />
  </el-config-provider>
</template>
