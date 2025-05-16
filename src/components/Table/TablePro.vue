<script setup lang="tsx">
import { omit } from 'lodash'
import Sortable from 'sortablejs'
import { forwardEmitEvents, forwardExposeEvents } from '@/utils'
import type { TableInstance } from 'element-plus'
import type { PaginationAlign, TableProColumn, TableProEmits, TableProProps } from './types'

const props = withDefaults(defineProps<TableProProps>(), {
  fit: true,
  showHeader: true,
  stripe: false,
  border: false,
  highlightCurrentRow: false,
  emptyText: 'No Data',
  defaultExpandAll: false,
  showPagination: true,
  loading: false,
  dragColumn: false,
  dragRow: false,
  data: () => [],
  pagination: () => ({
    align: 'right',
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 100,
    pageSizes: [10, 20, 30, 40, 50, 100],
    background: false,
    small: false,
    pagerCount: 7,
  }),
})

const emits = defineEmits<TableProEmits>()

const tableRef = ref<TableInstance>()

// 表格列的默认值
const tableColumnDefaults = {
  type: 'default',
  width: '',
  'min-width': '',
  fixed: false,
  sortable: false,
  resizable: true,
  align: 'left',
  'header-align': 'left',
  'filter-multiple': true,
  'sort-orders': ['ascending', 'descending', null],
  'reserve-selection': false,
  'show-overflow-tooltip': undefined,
}

// 表格事件名
const emitEvents = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'cell-contextmenu',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'header-dragend',
  'sort-change',
  'filter-change',
  'current-change',
  'expand-change',
  'scroll',
]
const paginationEvents = ['size-change', 'current-change', 'change', 'prev-click', 'next-click']

// 表格暴露的事件名
const exposeEvents = [
  'clearSelection',
  'getSelectionRows',
  'toggleRowSelection',
  'toggleAllSelection',
  'toggleRowExpansion',
  'setCurrentRow',
  'clearSort',
  'clearFilter',
  'doLayout',
  'sort',
  'scrollTo',
  'setScrollTop',
  'setScrollLeft',
  'columns',
  'updateKeyChildren',
]

const localeColumns = ref(props.columns)
const localeData = ref(props.data)

// 表格事件
const forwardEmits = forwardEmitEvents(emits, emitEvents)
// 分页事件
const forwardPaginationEmits = forwardEmitEvents(emits, paginationEvents, 'page-')
// 表格暴露的事件
const exposeMethods = forwardExposeEvents(tableRef, exposeEvents)
// el-table props
const tableProps = computed(() => omit(props, ['columns', 'pagination', 'loading', 'showPagination', 'data']))
// el-pagination props
const paginationProps = computed(() => omit(props.pagination, ['align']))

// 分页对齐方式
const PAGINATION_ALIGN_MAP: Record<PaginationAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const

// 分页类名
const paginationClass = computed(() => {
  if (!props.pagination) return
  const align = props.pagination.align ?? 'right'
  return PAGINATION_ALIGN_MAP[align]
})

const setAdaptiveDebounce = useDebounceFn(setAdaptive, 150)
useResizeObserver(tableRef.value?.$el, setAdaptiveDebounce)

onBeforeMount(() => {
  localeColumns.value = addId(props.dragColumn, props.columns)
  localeData.value = addId(props.dragRow, props.data)
  dragInit()
})
onMounted(() => {
  setAdaptiveDebounce()
  dragColumn()
  dragRow()
})

// 设置表格列的默认值
function setTableColumnDefaults(column: TableProColumn) {
  return { ...tableColumnDefaults, ...column }
}

function dragInit() {
  if (props.dragRow && localeData.value.length) {
    const defaultSlot = localeColumns.value[0].defaultSlot

    const DragBtn = (_props, { slots }) => {
      return (
        <div class="drag-btn flex cursor-pointer items-center gap-x-2">
          <i class="i-icon-park-outline:drag"></i>
          {slots.default?.()}
        </div>
      )
    }

    localeColumns.value[0].defaultSlot = (props: any) => {
      return (
        <DragBtn>
          {defaultSlot ? (
            <component is={defaultSlot} v-bind={props} />
          ) : (
            <span>{props.row[props.column.property]}</span>
          )}
        </DragBtn>
      )
    }
  }
}

// 拖拽列
async function dragColumn() {
  if (!props.dragColumn) return

  await nextTick()

  const el = tableRef.value?.$el.querySelector('.el-table__header-wrapper tr')
  Sortable.create(el, {
    delay: 0,
    animation: 300,
    onEnd: ({ newIndex, oldIndex }) => {
      if (newIndex === oldIndex || newIndex === undefined || oldIndex === undefined) return
      const item = localeColumns.value.splice(oldIndex, 1)[0]
      localeColumns.value.splice(newIndex, 0, item)
      emits('drag-column', localeColumns.value)
    },
  })
}
// 拖拽行
async function dragRow() {
  if (!props.dragRow) return

  await nextTick()

  const el = tableRef.value?.$el.querySelector('.el-table__body-wrapper tbody')

  console.log('dragRow el', el)

  Sortable.create(el, {
    delay: 0,
    animation: 300,
    handle: '.drag-btn',
    onEnd: ({ newIndex, oldIndex }) => {
      if (!newIndex || !oldIndex || newIndex === undefined || oldIndex === undefined) return
      const item = localeData.value.splice(oldIndex, 1)[0]
      localeData.value.splice(newIndex, 0, item)
      emits('drag-row', localeData.value)
    },
  })
}
// 设置表格自适应高度
async function setAdaptive() {
  if (!props.adaptive) return

  await nextTick()

  let paginationHeight = document.getElementById('table-pagination')?.clientHeight ?? 50
  if (typeof props.adaptive === 'number') {
    paginationHeight = props.adaptive
  }

  const height = window.innerHeight - tableRef.value?.$el.getBoundingClientRect().top - paginationHeight
  tableRef.value!.style.height = `${height}px`
}

function addId(flag: boolean, columns: TableProColumn[]) {
  if (flag && columns.length && !columns[0].id) {
    const id = Math.random().toString(36).slice(2)
    return columns.map((column, index) => ({ ...column, id: `${id}-${index}` }))
  }
  return columns
}

defineExpose(exposeMethods)
</script>

<template>
  <div>
    <el-table ref="tableRef" v-loading="loading" :data="localeData" v-bind="tableProps" v-on="forwardEmits">
      <TableColumn
        v-for="(column, index) in localeColumns"
        :key="column.id || index"
        v-bind="setTableColumnDefaults(column)"
      />

      <template #header>
        <slot name="header" />
      </template>

      <slot></slot>

      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>

    <slot name="footer">
      <div
        v-if="showPagination"
        id="table-pagination"
        :class="['flex p-2', paginationClass]"
        :style="{ height: typeof adaptive === 'number' ? `${adaptive}px` : 'auto' }"
      >
        <el-pagination v-bind="paginationProps" v-on="forwardPaginationEmits" />
      </div>
    </slot>
  </div>
</template>

<style scoped></style>
