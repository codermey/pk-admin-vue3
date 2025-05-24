import type { Directive } from 'vue'

interface ElType extends HTMLElement {
  _debounce: () => void
}

const debounce: Directive<ElType> = {
  mounted: (el, binding) => {
    const { value, arg } = binding

    if (typeof value !== 'function') {
      throw new Error('v-debounce 的值必须是函数')
    }

    const delay = Number(arg) ? Number(arg) : 500
    let timer: NodeJS.Timeout | null = null

    el._debounce = () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        value()
      }, delay)
    }
    el.addEventListener('click', el._debounce)
  },
  beforeUnmount: (el) => {
    el.removeEventListener('click', el._debounce)
  },
}

export default debounce
