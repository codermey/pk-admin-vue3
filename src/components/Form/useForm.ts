import { isEmpty } from 'lodash'
import type { FormSchema } from './types'

export const useForm = (schema: FormSchema | Ref<FormSchema>) => {
  const form = ref<any>()
  const rules = ref<any>()

  const model = computed(() => flatObj(form.value))

  onBeforeMount(() => {
    form.value = setForm(unref(schema) || [])
    rules.value = setRules(unref(schema) || [])
  })

  function setForm(schema: FormSchema, level = 0) {
    const obj = {}
    let i = 0
    schema.forEach((item) => {
      if (!item.prop) {
        item.prop = `form${level}-${i}`
      }
      if (item.value) {
        obj[item.prop] = item.value
      } else if (item.schema && item.schema.length) {
        obj[item.prop] = setForm(item.schema, level + 1)
        i++
      } else {
        obj[item.prop] = undefined
      }
    })
    return obj
  }

  function setRules(schema: FormSchema) {
    let formRules = {}

    schema.forEach((item) => {
      if (item.prop && item.rules && !isEmpty(item.rules)) {
        formRules[item.prop] = item.rules
      }
      if (item.schema && item.schema.length) {
        formRules = { ...formRules, ...setRules(item.schema) }
      }
    })
    return formRules
  }

  function flatObj(obj: any) {
    let result = {}

    if (typeof obj !== 'object') return result

    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key]).length) {
        result = { ...result, ...flatObj(obj[key]) }
      } else if (!key.startsWith('form')) {
        result[key] = obj[key]
      }
    }

    return result
  }

  return {
    form,
    model,
    rules,
    setForm,
  }
}
