<script setup lang="ts">
const props = defineProps<{ darkMode?: boolean }>()

const preferredDark = usePreferredDark()
const isDark = useStorage('dark-mode', props.darkMode)

watchEffect(async () => {
  await nextTick()
  toggleDarkMode(isDark.value)
})
watch(preferredDark, () => {
  isDark.value = preferredDark.value
})

onBeforeMount(() => {
  if (typeof isDark.value === 'undefined' && !props.darkMode) {
    isDark.value = preferredDark.value
  }
})

const toggleDarkMode = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const Moon = () => h('i', { class: 'i-ph:moon-duotone' })
const Sun = () => h('i', { class: 'i-ph:sun-duotone' })
</script>

<template>
  <ElSwitch
    v-model="isDark"
    :active-action-icon="Moon"
    :inactive-action-icon="Sun"
    style="--el-switch-on-color: #333"
  />
</template>

<style scoped></style>
