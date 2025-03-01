<script lang="ts" setup>
import { loadIcon, type IconifyIcon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const source = ref('')
const { copied, copy } = useClipboard({ source })

// 复制类型
const copyTypeFlag = ref(true)
// 显示文字
const showText = ref(true)

const handleClick = async (icon: string) => {
  if (copyTypeFlag.value) {
    source.value = `<div class="i-ep:${icon}"></div>`
  } else {
    const res = await loadIcon('ep:' + icon)
    source.value = objectToSvg(res)
  }
  copy()
  copied &&
    ElMessage({
      showClose: true,
      message: t('message.copied'),
      type: 'success',
    })
}

function objectToSvg(obj: IconifyIcon) {
  const { left, top, width, height, rotate, vFlip, hFlip, body } = obj
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" transform="translate(${left}, ${top}) rotate(${rotate}) scale(${hFlip ? -1 : 1}, ${vFlip ? -1 : 1})">${body}</svg>`
}

definePage({
  meta: {
    title: 'pages.icon-list',
    icon: 'mdi:emoticon-neutral-outline',
  },
})
</script>

<template>
  <div class="flex justify-end gap-x-8">
    <ElSwitch v-model="copyTypeFlag" class="mb-2" active-text="Copy icon code" inactive-text="Copy SVG content" />
    <ElSwitch
      v-model="showText"
      :active-text="$t('components.show-text')"
      :inactive-text="$t('components.hide-text')"
    />
  </div>
  <IconList :show-text="showText" @click="handleClick" />
</template>
