import type { Directive } from 'vue'
import { useUserStore } from '@/stores'

const has: Directive<HTMLElement> = {
  mounted: (el, binding) => {
    const store = useUserStore()
    const values = binding.value

    const keys = Object.keys(binding.modifiers)

    const not = binding.modifiers.not

    if (keys && keys.length) {
      const checkPermission = () => {
        const attribute = keys.find((k) => k !== 'not') || 'permission'

        if (typeof values === 'string') {
          const flag = not ? store[attribute].includes(values) : !store.permission.includes(values)

          if (flag) {
            el.style.display = 'none'
          } else {
            el.style.display = ''
          }
        } else if (Array.isArray(values)) {
          const flag = not
            ? values.some((item) => store[attribute].includes(item))
            : !values.some((item) => store[attribute].includes(item))

          if (flag) {
            el.style.display = 'none'
          } else {
            el.style.display = ''
          }
        }
      }

      store.$subscribe(checkPermission, { deep: true, immediate: true })
    }
  },
}

export default has
