<script setup lang="ts">
import VChart from 'vue-echarts'
import * as Charts from 'echarts/charts'
import * as ChartComponents from 'echarts/components'
import * as ChartFeatures from 'echarts/features'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { addUnit, isColor } from '@/utils'
import { COMPONENTS_MAP, CHARTS_MAP } from './const'

import type { VueEChartProps } from './types'
import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<VueEChartProps>(), {
  autoresize: true,
  width: '100%',
  height: '400px',
})

const attrs = useAttrs()

const chartStyle = computed<CSSProperties>(() => {
  return {
    ...(attrs.style ? attrs.style : {}),
    backgroundColor: props.theme && isColor(props.theme) ? props.theme : undefined,
    width: addUnit(props.width),
    height: addUnit(props.height),
  }
})

onBeforeMount(() => {
  if (!props.option) return
  const deps: string[] = []
  Object.keys(props.option).forEach((key) => {
    if (COMPONENTS_MAP[key]) {
      deps.push(COMPONENTS_MAP[key])
    }
  })

  const charts: string[] = []
  const features: string[] = []
  const series = Array.isArray(props.option.series) ? props.option.series : [props.option.series]
  series.forEach((item) => {
    if (CHARTS_MAP[item.type]) {
      charts.push(CHARTS_MAP[item.type])
    }

    if (item.labelLayout) {
      features.push('LabelLayout')
    }
    if (item.universalTransition) {
      features.push('UniversalTransition')
    }
  })

  use([
    CanvasRenderer,
    ...Array.from(new Set(charts)).map((chart) => Charts[chart]),
    ...deps.map((dep) => ChartComponents[dep]),
    ...Array.from(new Set(features)).map((feature) => ChartFeatures[feature]),
  ])
})
</script>

<template>
  <v-chart v-bind="props" :style="chartStyle" />
</template>
