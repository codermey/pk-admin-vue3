<script lang="tsx" setup>
import type { IconifyIcon } from '@iconify/vue'
import { getAssetsImageUrl } from '@/utils'
import Iconify from '@/components/Icons/Iconify.vue'

definePage({
  meta: {
    title: '登录',
    layout: 'single-page',
    backgroundImage: getAssetsImageUrl('login_bg.png'),
    hideMenu: true,
  },
})

const form = reactive({
  username: '',
  password: '',
  remember: false,
})

function getIcon(icon: string | IconifyIcon) {
  return () => <Iconify icon={icon} />
}
</script>

<template>
  <div class="self-end lt-xl:(self-center rounded-lg bg-white p-8 shadow-lg)">
    <h3 class="mb-5 text-2xl">{{ $t('pages.login.title') }}</h3>

    <ElForm :model="form" class="min-w-[350px]">
      <ElFormItem>
        <ElInput v-model="form.username" :placeholder="$t('pages.login.username')" :prefix-icon="getIcon('ep:user')" />
      </ElFormItem>
      <ElFormItem>
        <ElInput
          v-model="form.password"
          :placeholder="$t('pages.login.password')"
          :prefix-icon="getIcon('ep:lock')"
          type="password"
        />
      </ElFormItem>

      <ElFormItem>
        <div class="w-full flex justify-between">
          <ElCheckbox v-model="form.remember" :label="$t('pages.login.remember-account')" />
          <ElLink type="primary">{{ $t('pages.login.register-account') }}</ElLink>
        </div>
      </ElFormItem>

      <!-- 按钮 -->
      <ElFormItem>
        <ElButton class="w-full" type="primary">{{ $t('pages.login.confirm') }}</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>
