import type { Component } from 'vue'
import type { TableProps as ElTableProps, TableColumnCtx, PaginationProps } from 'element-plus'

export type PaginationAlign = 'left' | 'right' | 'center'

export interface TableProPagination extends Partial<PaginationProps> {
  align: PaginationAlign
}

export interface TableProColumn extends Partial<TableColumnCtx<any>> {
  id?: number | string
  headerSlot?: Component
  defaultSlot?: Component
  children?: TableProColumn[]
}

export interface TableProProps extends ElTableProps<any> {
  columns: TableProColumn[]
  pagination?: TableProPagination
  showPagination?: boolean
  adaptive?: boolean | number
  dragColumn?: boolean
  dragRow?: boolean
  loading?: boolean
  elementLoadingText?: string
  elementLoadingSpinner?: string
  elementLoadingSvg?: string
  elementLoadingSvgViewBox?: string
  elementLoadingBackground?: string
  elementLoadingCustomClass?: string
}

export interface ElTableEmits {
  // 选择事件
  select: [selection: any[], row: any]
  'select-all': [selection: any[]]
  'selection-change': [selection: any[]]

  // 单元格事件
  'cell-mouse-enter': [row: any, column: any, cell: HTMLTableCellElement, event: Event]
  'cell-mouse-leave': [row: any, column: any, cell: HTMLTableCellElement, event: Event]
  'cell-click': [row: any, column: any, cell: HTMLTableCellElement, event: Event]
  'cell-dblclick': [row: any, column: any, cell: HTMLTableCellElement, event: Event]
  'cell-contextmenu': [row: any, column: any, cell: HTMLTableCellElement, event: Event]

  // 行事件
  'row-click': [row: any, column: any, event: Event]
  'row-contextmenu': [row: any, column: any, event: Event]
  'row-dblclick': [row: any, column: any, event: Event]

  // 表头事件
  'header-click': [column: any, event: Event]
  'header-contextmenu': [column: any, event: Event]
  'header-dragend': [newWidth: number, oldWidth: number, column: any, event: MouseEvent]

  // 数据变化事件
  'sort-change': [data: { column: any; prop: string; order: any }]
  'filter-change': [filters: any]
  'current-change': [currentRow: any, oldCurrentRow: any]

  // 展开行事件
  'expand-change': [row: any, expandedRows: any[]] | [row: any, expanded: boolean]

  // 滚动事件
  scroll: [data: { scrollLeft: number; scrollTop: number }]
}

export interface PaginationEmits {
  'page-size-change': [size: number]
  'page-current-change': [currentPage: number]
  'page-change': [currentPage: number, pageSize: number]
  'page-prev-click': [currentPage: number]
  'page-next-click': [currentPage: number]
}

export interface TableProDragEmits {
  'drag-column': [columns: TableProColumn[]]
  'drag-row': [rows: any[]]
}

export type TableProEmits = ElTableEmits & PaginationEmits & TableProDragEmits
