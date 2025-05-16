<script setup lang="tsx">
import TablePro from '@/components/Table/TablePro.vue'
import type { TableProColumn } from '@/components/Table/types'
import type { TableColumnCtx, TableInstance } from 'element-plus'

definePage({
  meta: {
    title: 'pages.complex-table',
    icon: 'mdi:table-large',
  },
})

const activeName = ref('first')

const tableData = ref([
  {
    name: '张三',
    age: 18,
    gender: '男',
    address: '北京市海淀区',
    email: 'zhangsan@163.com',
  },
  {
    name: '李四',
    age: 20,
    gender: '女',
    address: '北京市海淀区',
    email: 'lisi@163.com',
  },
  {
    name: '王五',
    age: 22,
    gender: '男',
    address: '北京市朝阳区',
    email: 'wangwu@163.com',
  },
])

const singleColumns = ref([
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'gender',
    label: '性别',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'action',
    label: '操作',
    defaultSlot: (props: any) => {
      return (
        <el-button
          onClick={() => {
            console.log('props', props)
          }}
        >
          确认
        </el-button>
      )
    },
  },
])

const singleTableRef = ref<TableInstance>()
const setCurrent = (row?: any) => {
  singleTableRef.value?.setCurrentRow(row)
}

const multipleColumns = ref([
  {
    type: 'selection',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'gender',
    label: '性别',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
])

const multipleTableRef = ref<TableInstance>()
const toggleSelection = (rows?: any[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value?.toggleRowSelection(row)
    })
  } else {
    multipleTableRef.value?.clearSelection()
  }
}

const filterColumns = ref<TableProColumn[]>([
  {
    prop: 'date',
    label: '日期',
    sortable: true,
    columnKey: 'date',
    filters: [
      { text: '2016-05-01', value: '2016-05-01' },
      { text: '2016-05-02', value: '2016-05-02' },
      { text: '2016-05-03', value: '2016-05-03' },
      { text: '2016-05-04', value: '2016-05-04' },
    ],
    filterMethod: (value: string, row: any, column: TableColumnCtx<any>) => {
      const property = column['property']
      return row[property] === value
    },
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'tag',
    label: '标签',
    filters: [
      { text: 'Home', value: 'Home' },
      { text: 'Office', value: 'Office' },
    ],
    filterPlacement: 'bottom-end',
    filterMethod: (value: string, row: any) => {
      return row.tag === value
    },
    defaultSlot: ({ row }: { row: any }) => {
      return <el-tag type={row.tag === 'Home' ? 'primary' : 'success'}>{row.tag}</el-tag>
    },
  },
])

const filterTableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
])

const filterTableRef = ref<TableInstance>()

const resetDateFilter = () => {
  filterTableRef.value?.clearFilter(['date'])
}
const clearFilter = () => {
  filterTableRef.value?.clearFilter()
}

const expandTableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
]
const familyColumns = [
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'state',
    label: 'State',
  },
  {
    prop: 'city',
    label: 'City',
  },
  {
    prop: 'address',
    label: 'Address',
  },
  {
    prop: 'zip',
    label: 'Zip',
  },
]
const expandColumns: TableProColumn[] = [
  {
    type: 'expand',
    defaultSlot: (props: any) => {
      return (
        <div class="m-4">
          <p class="mb-2">State: {props.row.state}</p>
          <p class="mb-2">City: {props.row.city}</p>
          <p class="mb-2">Address: {props.row.address}</p>
          <p class="mb-2">Zip: {props.row.zip}</p>
          <h3>Family</h3>
          <el-button
            onClick={() => {
              console.log(props)
            }}
          >
            Click me
          </el-button>
          <TablePro data={props.row.family} columns={familyColumns}></TablePro>
        </div>
      )
    },
  },
  {
    label: '日期',
    prop: 'date',
  },
  {
    label: '姓名',
    prop: 'name',
  },
]

const parentBorder = ref(false)
const childBorder = ref(false)
const preserveExpanded = ref(false)
</script>

<template>
  <div class="p-4">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="单选" name="first">
        <TablePro
          ref="singleTableRef"
          adaptive
          drag-column
          drag-row
          highlight-current-row
          element-loading-text="Loading..."
          :data="tableData"
          :columns="singleColumns"
        ></TablePro>
        <div style="margin-top: 20px">
          <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
          <el-button @click="setCurrent()">Clear selection</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="多选" name="second">
        <TablePro ref="multipleTableRef" :data="tableData" :columns="multipleColumns"></TablePro>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])">
            Toggle selection status of second and third rows
          </el-button>
          <el-button @click="toggleSelection()">Clear selection</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="筛选" name="third">
        <TablePro ref="filterTableRef" :data="filterTableData" :columns="filterColumns"></TablePro>
        <div style="margin-top: 20px">
          <el-button @click="resetDateFilter">reset date filter</el-button>
          <el-button @click="clearFilter">reset all filters</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="展开行" name="fourth">
        switch parent border: <el-switch v-model="parentBorder" /> switch child border:
        <el-switch v-model="childBorder" /> preserve expanded:
        <el-switch v-model="preserveExpanded" />
        <TablePro
          :border="parentBorder"
          :preserve-expanded-content="preserveExpanded"
          :data="expandTableData"
          :columns="expandColumns"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped></style>
