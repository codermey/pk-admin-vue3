<script setup lang="ts">
import type { EditorProps, VditorOptions } from './types'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const modelValue = defineModel<string>()

const props = defineProps<EditorProps>()

const emits = defineEmits(['init'])

const defaultOptions: VditorOptions = {
  rtl: false,

  /** 编辑器初始化值。默认值: '' */
  value: '',

  /** 是否显示日志。默认值: false */
  debugger: false,

  /** 是否启用打字机模式。默认值: false */
  typewriterMode: false,

  minHeight: 400,

  /** 编辑器总高度。默认值: 'auto' */
  height: 'auto',

  /** 编辑器总宽度，支持 %。默认值: 'auto' */
  width: 'auto',

  /** 输入区域为空时的提示。默认值: '' */
  placeholder: '',

  /** 多语言。默认值: 'zh_CN' */
  lang: 'zh_CN',

  /** 全屏层级。默认值: 90 */
  fullscreen: {
    index: 90,
  },

  /** 计数器配置 */
  counter: {
    /** 是否启用计数器。默认值: false */
    enable: false,
    /** 统计类型。默认值: 'markdown' */
    type: 'markdown',
  },

  /** 缓存配置 */
  cache: {
    id: Math.random().toString(36).slice(2),
    /** 是否使用 localStorage 进行缓存。默认值: true */
    enable: true,
  },

  /**
   * 编辑模式。默认值: 'wysiwyg'
   * wysiwyg: 所见即所得
   * ir: 即时渲染
   * sv: 分屏预览
   */
  mode: 'ir',

  /** 链接配置 */
  link: {
    /** 是否打开链接地址。默认值: true */
    isOpen: true,
  },

  /** 图片配置 */
  image: {
    /** 是否预览图片。默认值: true */
    isPreview: true,
  },

  /** 主题。默认值: 'classic' */
  theme: 'classic',

  /** 图标。默认值: 'ant' */
  icon: 'ant',

  /** 配置自建 CDN 地址。默认值: 'https://unpkg.com/vditor@${VDITOR_VERSION}' */
  cdn: 'https://unpkg.com/vditor@3.11.1',

  upload: {
    url: 'https://yzdh.tenqent.com/adminapi/common/upload',
    accept: 'image/*',
    fieldName: 'file',
    filename: (name) => {
      return name
    },
    format: (files, responseText) => {
      const response = JSON.parse(responseText)
      const vditorResponse: any = {
        msg: response.msg,
        code: response.code === 200 ? 0 : response.code,
        data: {
          errFiles: [],
          succMap: {},
        },
      }
      if (response.code === 200) {
        vditorResponse.data.succMap[files[0].name] = response.data.full_filepath
      } else {
        vditorResponse.data.errFiles.push(files[0].name)
      }

      return JSON.stringify(vditorResponse)
    },
  },
}

const editorRef = useTemplateRef('editorRef')
const editorInstance = shallowRef<Vditor>()
const historyValue = ref<string>('')

watch(modelValue, (newVal) => {
  if (editorInstance.value && newVal && newVal !== editorInstance.value.getValue()) {
    editorInstance.value.setValue(newVal)
  }
})

watch(
  () => props.options,
  (newVal) => {
    historyValue.value = editorInstance.value?.getValue() || ''
    editorInstance.value?.destroy()
    initEditor(newVal)
  },
  {
    deep: true,
  },
)

onMounted(() => {
  if (editorRef.value) {
    initEditor(props.options)
    emits('init', editorInstance.value)
  }
})

onBeforeMount(() => {
  editorInstance.value?.destroy()
})

function initEditor(options: VditorOptions) {
  if (!editorRef.value) return
  const defaultAfter = options?.after
  const defaultInput = options?.input
  editorInstance.value = new Vditor(
    editorRef.value,
    Object.assign(defaultOptions, {
      ...options,
      after: () => {
        defaultAfter && defaultAfter()
        if (historyValue.value) {
          editorInstance.value?.setValue(historyValue.value, true)
        }
        modelValue.value = editorInstance.value?.getValue()
      },
      input: (md) => {
        defaultInput && defaultInput(md)
        modelValue.value = md
      },
    }),
  )
}
</script>

<template>
  <div ref="editorRef"></div>
</template>

<style scoped></style>
