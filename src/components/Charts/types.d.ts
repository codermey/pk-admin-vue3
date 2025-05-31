import { init } from 'echarts/core'
import type { ECharts, SetOptionOpts } from 'echarts'

export type Injection<T> = T | null | Ref<T | null> | { value: T | null }

type InitType = typeof init
export type InitParameters = Parameters<InitType>
export type Theme = NonNullable<InitParameters[1]>
export type InitOptions = NonNullable<InitParameters[2]>

export type InitOptionsInjection = Injection<InitOptions>

export type UpdateOptions = SetOptionOpts
export type UpdateOptionsInjection = Injection<UpdateOptions>

export type EChartsType = ReturnType<InitType>
type ZRenderType = ReturnType<EChartsType['getZr']>
export type EventTarget = EChartsType | ZRenderType

type SetOptionType = EChartsType['setOption']
export type Option = Parameters<SetOptionType>[0]

type AutoresizeProp = boolean | { throttle?: number; onResize?: () => void }

export type LoadingOptions = {
  text?: string
  textColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  fontStyle?: string
  fontFamily?: string
  maskColor?: string
  showSpinner?: boolean
  color?: string
  spinnerRadius?: number
  lineWidth?: number
  zlevel?: number
}

export interface VueEChartProps {
  initOption?: InitOptions
  option: Option
  updateOption?: UpdateOptions
  autoresize?: AutoresizeProp
  group?: string
  theme?: 'dark' | 'default' | string
  loading?: boolean
  loadingOptions?: LoadingOptions
  manualUpdate?: boolean
  width?: string | number
  height?: string | number
}

export interface EChartsProps {
  option: Option
  width?: string | number
  height?: string | number
  autoresize?: boolean
}

export interface EChartsEmits {
  init: [chart: ECharts]
}
