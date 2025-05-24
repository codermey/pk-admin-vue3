<script lang="ts" setup>
import { useForm } from './useForm'
import type { FormInstance, FormItemProp } from 'element-plus'
import type { FormProps } from './types'
import { forwardExposeEvents } from '@/utils'

const modelValue = defineModel<any>()

const props = withDefaults(defineProps<FormProps>(), {
  inline: false,
  labelPosition: 'right',
  hideRequiredAsterisk: false,
  requireAsteriskPosition: 'left',
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: true,
  disabled: false,
  scrollToError: false,
})

const emits = defineEmits<{
  validate: [prop: FormItemProp, isValid: boolean, message: string]
}>()

const exposeEvents = ['validate', 'validateField', 'resetFields', 'scrollToField', 'clearValidate', 'fields']

const formRef = ref<FormInstance>()

const { form, rules, model } = useForm(props.schema || [])

const exposeMethods = forwardExposeEvents(formRef, exposeEvents)

watch(
  form,
  () => {
    modelValue.value = form.value
  },
  { deep: true },
)

defineExpose({ ...exposeMethods })
</script>

<template>
  <el-form
    v-bind="props"
    ref="formRef"
    :rules="rules"
    :model="model"
    @validate="(...args) => emits('validate', ...args)"
  >
    <slot name="default">
      <template v-if="schema && schema.length">
        <FormLayout v-for="(item, index) in schema" :key="index" v-bind="item" v-model="form[item.prop as string]" />
      </template>
    </slot>

    <slot name="actions"> </slot>
  </el-form>
</template>
