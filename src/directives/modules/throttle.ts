import type { Directive } from 'vue'

interface ElType extends HTMLElement {
  disabled?: boolean
  _throttle: () => void
}

const throttle: Directive<ElType> = {
  mounted: (el, binding) => {
    const { value, arg } = binding

    if (typeof value !== 'function') {
      throw new Error('v-throttle 的值必须是函数')
    }

    const delay = Number(arg) ? Number(arg) : 500
    let timer: NodeJS.Timeout | null = null

    el._throttle = () => {
      timer && clearTimeout(timer)

      if (!el.disabled) {
        el.disabled = true
        value()
        timer = setTimeout(() => {
          el.disabled = false
        }, delay)
      }
    }
    el.addEventListener('click', el._throttle)
  },
  beforeUnmount: (el) => {
    el.removeEventListener('click', el._throttle)
  },
}

export default throttle
