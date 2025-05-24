import type { Directive } from 'vue'
import { ElMessage } from 'element-plus'

export interface ElType extends HTMLElement {
  copyData: any
  _copy: () => void
}

const copy: Directive<ElType> = {
  mounted: (el, binding) => {
    const { value, modifiers } = binding
    el.copyData = value
    const { copy } = useClipboard({ source: value })
    el._copy = () => {
      copy(el.copyData)
      !modifiers.mute && ElMessage.success('复制成功')
    }

    el.addEventListener('click', el._copy)
  },
  updated: (el, binding) => {
    el.copyData = binding.value
  },
  beforeUnmount: (el) => {
    el.removeEventListener('click', el._copy)
  },
}

export default copy
