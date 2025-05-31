<script lang="ts" setup>
import { useUserStore } from '@/stores'
import type { EChartsOption } from 'echarts'

definePage({
  meta: {
    title: 'pages.home',
    icon: 'mdi:home',
  },
})

const copyMsg = ref('')

const option = ref<EChartsOption>({
  legend: {},
  tooltip: {
    trigger: 'axis',
    showContent: false,
  },
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
      ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
      ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
      ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
      ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
    ],
  },
  xAxis: { type: 'category' },
  yAxis: { gridIndex: 0 },
  grid: { top: '55%' },
  series: [
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
    },
    {
      type: 'pie',
      id: 'pie',
      radius: '30%',
      center: ['50%', '25%'],
      emphasis: {
        focus: 'self',
      },
      label: {
        formatter: '{b}: {@2012} ({d}%)',
      },
      encode: {
        itemName: 'product',
        value: '2012',
        tooltip: '2012',
      },
    },
  ],
})

const addPermission = () => {
  useUserStore().permission.push('user')
}
</script>

<template>
  <div class="text-teal-700">
    <h1 class="text-3xl font-bold">Home Page</h1>
    <RouterLink class="hover:underline" to="/about">Go to About Page</RouterLink>
    <IconfontIcon name="down-line" />
  </div>

  <div>
    <h5>复制指令</h5>
    <div class="w-100 flex gap-2">
      <el-input v-model="copyMsg" />
      <el-button v-copy="copyMsg">复制</el-button>
    </div>
  </div>

  <div>
    <h5>防抖指令</h5>
    <el-button v-debounce="() => console.log('debounce')" type="primary">click</el-button>
  </div>

  <div>
    <h5>节流指令</h5>
    <el-button v-throttle="() => console.log('throttle')" type="primary">click</el-button>
  </div>

  <div>
    <h5>拖拽指令</h5>
    <div v-draggable class="size-100 bg-blue-600"></div>
  </div>

  <div>
    <h5>水印指令</h5>
    <div v-water="{ text: '测试测试' }" class="size-100"></div>
  </div>

  <div>
    <h5>权限指令</h5>
    <el-button v-has.permission.not="'admin'">admin</el-button>
    <el-button v-has.permission="['admin', 'user']">admin, user</el-button>
    <el-button v-has.permission="['admin', 'user']">admin, user</el-button>
    <el-button v-has.permission="['admin', 'user']">admin, user</el-button>
    <el-button v-has.permission="['user']">user</el-button>
    <el-button type="primary" @click="addPermission">add permission</el-button>
  </div>

  <ECharts :option="option" :style="{ width: '100%', height: '1000px' }" />
</template>
