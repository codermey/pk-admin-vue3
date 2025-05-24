<script setup lang="ts">
import { omit } from 'lodash'
import type { FormItemProps } from './types'

const modelValue = defineModel<any>()
const props = withDefaults(defineProps<FormItemProps>(), {
  showMessage: true,
  labelWidth: '',
  inlineMessage: '',
  required: undefined,
})

const formItemProps = computed(() => omit(props, ['type', 'colProps', 'attrs', 'schema', 'children']))
</script>

<template>
  <el-form-item v-if="schema && schema.length" v-bind="formItemProps">
    <el-col v-for="(item, index) in schema" v-bind="item.colProps" :key="index">
      <FormItem v-bind="item" v-model="modelValue[item.prop as string]" />
    </el-col>
  </el-form-item>

  <el-col v-else-if="colProps && colProps.span" v-bind="colProps">
    <FormItem v-bind="props" v-model="modelValue" />
  </el-col>

  <template v-else>
    <FormItem v-bind="props" v-model="modelValue" />
  </template>
</template>

<style scoped></style>
