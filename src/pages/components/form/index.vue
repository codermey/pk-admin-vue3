<script setup lang="tsx">
import type { FormSchema } from '@/components/Form/types'
import { useForm } from '@/components/Form/useForm'
import type { FormInstance, FormItemProp, FormItemInstance } from 'element-plus'

definePage({
  meta: {
    title: 'pages.form-basic',
    icon: 'mdi:form',
  },
})

const formRef = ref<FormInstance>()
const formItemRef = ref<FormItemInstance>()

const schema = ref<FormSchema>([
  {
    type: 'input',
    prop: 'name',
    value: '',
    label: 'Activity name',
    rules: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    labelSlot: ({ label }) => {
      return <div class="text-red-500">{label}</div>
    },
    errorSlot: ({ error }) => {
      return <span class="text-blue-500">{error}</span>
    },
    itemRef: (el) => {
      formItemRef.value = el
    },
  },
  {
    type: 'select',
    prop: 'region',
    value: '',
    label: 'Activity zone',
    children: [
      { label: 'Zone one', value: 'shanghai' },
      { label: 'Zone two', value: 'beijing' },
    ],
    rules: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change',
      },
    ],
  },
  {
    label: 'Activity time',
    schema: [
      {
        type: 'date-picker',
        prop: 'date1',
        value: '',
        colProps: { span: 11 },
        attrs: { class: 'w-full!' },
        rules: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
          },
        ],
      },
      { type: 'text', colProps: { span: 2 }, value: '-', attrs: { class: 'text-center w-full!' } },
      {
        type: 'time-picker',
        prop: 'date2',
        value: '',
        colProps: { span: 11 },
        attrs: { class: 'w-full!' },
        rules: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
          },
        ],
      },
    ],
  },
  { type: 'switch', prop: 'delivery', value: false, label: 'Instant delivery' },
  {
    type: 'checkbox',
    prop: 'type',
    value: [],
    label: 'Activity type',
    children: [
      { label: 'Online activities', value: 'Online activities' },
      { label: 'Promotion activities', value: 'Promotion activities' },
      { label: 'Offline activities', value: 'Offline activities' },
      { label: 'Simple brand exposure', value: 'Simple brand exposure' },
    ],
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
      },
    ],
  },
  {
    type: 'radio',
    prop: 'resource',
    value: '',
    label: 'Resource',
    children: [
      { label: 'Sponsor', value: 'Sponsor' },
      { label: 'Venue', value: 'Venue' },
    ],
    rules: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change',
      },
    ],
  },
  {
    type: 'input',
    prop: 'desc',
    value: '',
    label: 'Activity description',
    attrs: { type: 'textarea' },
    rules: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
  },
])

const { form, model } = useForm(schema)

const handleValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  console.log('prop', prop)
  console.log('isValid', isValid)
  console.log('message', message)
}

const onSubmit = () => {
  formRef.value?.validate()
}

const onCancel = () => {
  formItemRef.value?.clearValidate()
}
</script>

<template>
  <div>
    <Form ref="formRef" v-model="form" :schema="schema" @validate="handleValidate">
      <template #actions>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
      </template>
    </Form>
    {{ model }}
  </div>
</template>

<style scoped></style>
