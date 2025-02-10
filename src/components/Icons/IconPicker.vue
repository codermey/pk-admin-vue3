<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { IconPickerConfirmType } from './types'

const emits = defineEmits<{
  cancel: [void]
  confirm: [IconPickerConfirmType]
}>()

const [visible, toggle] = useToggle(false)

const iconName = ref('')
const color = ref('#409eff')
const fontSize = ref(16)

const handleIconClick = (icon: string) => {
  iconName.value = `ep:${icon}`
}

const handleCancel = () => {
  toggle(false)
  emits('cancel')
}

const handleConfirm = () => {
  toggle(false)
  emits('confirm', { icon: iconName.value, fontSize: fontSize.value, color: color.value })
}
</script>

<template>
  <ElButton type="primary" @click="toggle(true)">选择图标</ElButton>

  <ElDialog v-model="visible" width="50%">
    <IconList :show-text="false" item-class="py-1" active-class="text-sky-300" @click="handleIconClick" />

    <div class="flex items-center gap-x-4 py-2">
      <div class="flex items-center">
        <span>color：</span>
        <ElColorPicker v-model="color" />
      </div>
      <div class="flex flex-1 items-center">
        <span>size：</span>
        <ElSlider v-model="fontSize" :min="12" size="small" show-input />
      </div>
    </div>

    <div>
      <span>选择的图标：</span>
      <Icon :icon="iconName" :style="{ fontSize: `${fontSize}px`, color }" />
    </div>
    <template #footer>
      <ElButton @click="handleCancel">取消</ElButton>
      <ElButton type="primary" @click="handleConfirm">确认</ElButton>
    </template>
  </ElDialog>
</template>

<style scoped></style>
