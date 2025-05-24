import type {
  FormProps as ElFormProps,
  FormMetaProps,
  FormItemProps as ElFormItemProps,
  ColProps,
  FormItemRule,
  FormItemInstance,
} from 'element-plus'
import type { Component } from 'vue'

export type FormItemType =
  | 'input'
  | 'button'
  | 'input-number'
  | 'select'
  | 'option'
  | 'text'
  | 'link'
  | 'rate'
  | 'slider'
  | 'switch'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio'
  | 'radio-button'
  | 'radio-group'
  | 'cascader'
  | 'color-picker'
  | 'time-picker'
  | 'time-select'
  | 'date-picker'
  | 'transfer'
  | 'avatar'
  | 'image'
  | 'progress'
  | 'tag'
  | 'timeline'
  | 'tree'
  | 'steps'
  | 'step'
  | ''
  | undefined

export interface FormItemProps extends Partial<ElFormItemProps> {
  prop?: string
  type?: FormItemType
  value?: any
  /** 扩展属性 */
  attrs?: Record<string, any>
  colProps?: Partial<ColProps>
  children?: any[]
  schema?: FormSchema
  rules?: FormItemRule[]
  itemRef?: (el: FormItemInstance) => void
  childRef?: (el: Ref<any>) => void
  defaultSlot?: () => Component
  labelSlot?: ({ label }: { label: string }) => Component
  errorSlot?: ({ error }: { error: string }) => Component
}

export type FormSchema = FormItemProps[]

export interface FormProps extends Partial<ElFormProps>, Partial<FormMetaProps> {
  schema?: FormSchema
}
