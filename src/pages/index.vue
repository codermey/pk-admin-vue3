<script lang="ts" setup>
import { loadLocaleMessages } from '@/modules/i18n'

const locale = ref('zh-CN')

watchEffect(() => {
  loadLocaleMessages(locale.value)
})

definePage({
  meta: {
    title: '首页',
    icon: 'mdi:home',
  },
})
</script>

<template>
  <div class="text-teal-700">
    <select v-model="locale">
      <option value="en">English</option>
      <option value="zh-CN">中文</option>
    </select>

    <h1>{{ $t('hello') }}</h1>
    <h1>{{ $t('login') }}</h1>
    <h1>{{ $t('logout') }}</h1>
    <h1 class="text-3xl font-bold">Home Page</h1>
    <RouterLink class="hover:underline" to="/about">Go to About Page</RouterLink>
    <IconfontIcon name="down-line" />
  </div>
</template>
