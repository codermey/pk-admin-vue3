<script setup lang="ts">
import * as echarts from 'echarts'
import { addUnit } from '@/utils'
import type { EChartsOption, ECharts } from 'echarts'
import type { CSSProperties } from 'vue'
import type { EChartsProps, EChartsEmits } from './types'

const props = withDefaults(defineProps<EChartsProps>(), {
  width: '100%',
  height: '400px',
  autoresize: true,
})

const emits = defineEmits<EChartsEmits>()

const attrs = useAttrs()
const chartRef = useTemplateRef('chartRef')
const chartInstance = shallowRef<ECharts>()

const chartStyle = computed<CSSProperties>(() => {
  return {
    ...(attrs.style ? attrs.style : {}),
    width: addUnit(props.width),
    height: addUnit(props.height),
  }
})

const resizeFn = useThrottleFn(resize, 30)

watch(
  () => props.option,
  async (newOption) => {
    await nextTick()
    if (!chartInstance.value) return
    chartInstance.value.setOption(newOption as EChartsOption)
  },
  {
    deep: true,
  },
)

onMounted(() => {
  initChart()
  if (props.autoresize) {
    window.addEventListener('resize', resizeFn)
  }
})

onBeforeUnmount(() => {
  chartInstance.value?.dispose()
  if (props.autoresize) {
    window.removeEventListener('resize', resizeFn)
  }
})

function initChart() {
  if (!chartRef.value || !props.option) return
  chartInstance.value = echarts.init(chartRef.value)
  chartInstance.value.setOption(props.option as EChartsOption)
  emits('init', chartInstance.value)
}

function resize() {
  if (!chartInstance.value) return
  chartInstance.value.resize()
}
</script>

<template>
  <div ref="chartRef" :style="chartStyle"></div>
</template>

<style scoped></style>
