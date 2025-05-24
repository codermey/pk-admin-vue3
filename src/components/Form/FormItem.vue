<script setup lang="ts">
import { omit } from 'lodash'
import type { FormItemProps } from './types'
import type { FormItemInstance } from 'element-plus'
// import { forwardExposeEvents } from '@/utils'

const modelValue = defineModel<any>()
const props = withDefaults(defineProps<FormItemProps>(), {
  showMessage: true,
  labelWidth: '',
  inlineMessage: '',
  required: undefined,
})

// const exposeEvents = ['size', 'validateMessage', 'validateState', 'validate', 'resetField', 'clearValidate']

// const formItemRef = ref<FormItemInstance>()

const formItemProps = computed(() => omit(props, ['type', 'colProps', 'attrs', 'children']))

// const expose = forwardExposeEvents(formItemRef, exposeEvents)

// watch(formItemRef, () => {
//   if (formItemRef.value && props.itemRef) {
//     props.itemRef(formItemRef.value)
//   }
// })

onBeforeMount(() => {
  if ((props.type === 'select' || props.type === 'radio') && props.value === '') {
    modelValue.value = undefined
  } else {
    modelValue.value = props.value
  }
})

// defineExpose({ ...expose })
</script>

<template>
  <el-form-item :ref="(el: FormItemInstance) => props.itemRef && props.itemRef(el)" v-bind="formItemProps">
    <template v-if="defaultSlot" #default>
      <component :is="defaultSlot" />
    </template>

    <template v-else #default>
      <el-select v-if="type === 'select'" v-model="modelValue" v-bind="attrs">
        <el-option v-for="(option, index) in children" :key="index" :label="option.label" :value="option.value" />
      </el-select>

      <el-checkbox-group v-else-if="type === 'checkbox'" v-model="modelValue" v-bind="attrs">
        <el-checkbox v-for="(option, index) in children" :key="index" :value="option.value" :label="option.label" />
      </el-checkbox-group>

      <el-radio-group v-else-if="type === 'radio'" v-model="modelValue" v-bind="attrs">
        <el-radio v-for="(option, index) in children" :key="index" :value="option.value">{{ option.label }}</el-radio>
      </el-radio-group>

      <span v-else-if="type === '' || type === undefined" v-bind="attrs">{{ value }}</span>

      <component
        v-bind="attrs"
        :is="`el-${type}`"
        v-else-if="!['radio', 'checkbox', 'select'].includes(type)"
        v-model="modelValue"
      />
    </template>

    <template v-if="labelSlot" #label="{ label }">
      <component :is="labelSlot({ label })" />
    </template>

    <template v-if="errorSlot" #error="{ error }">
      <component :is="errorSlot({ error })" />
    </template>
  </el-form-item>
</template>

<style scoped></style>
