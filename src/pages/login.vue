<script setup lang="tsx">
import type { IconifyIcon } from '@iconify/vue'
import Iconify from '@/components/Icons/Iconify.vue'

const form = reactive({
  username: '',
  password: '',
  remember: false,
})

const onSubmit = () => {
  console.log(form)
}
function getIcon(icon: string | IconifyIcon) {
  return () => h(Iconify, { icon })
}

definePage({
  meta: {
    layout: 'single-page',
  },
})
</script>

<template>
  <div class="mx-60 self-end">
    <h3 class="mb-5 text-2xl">{{ $t('pages.login.title') }}</h3>

    <ElForm :model="form" class="min-w-[350px]">
      <ElFormItem>
        <ElInput v-model="form.username" :prefix-icon="getIcon('ep:user')" :placeholder="$t('pages.login.username')" />
      </ElFormItem>
      <ElFormItem>
        <ElInput
          v-model="form.password"
          type="password"
          :prefix-icon="getIcon('ep:lock')"
          :placeholder="$t('pages.login.password')"
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
        <ElButton class="w-full" type="primary" @click="onSubmit">{{ $t('pages.login.confirm') }}</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>
