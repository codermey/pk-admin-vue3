<script setup lang="tsx">
import type { TableProColumn } from '@/components/Table/types'

definePage({
  meta: {
    title: 'pages.table-basic',
    icon: 'mdi:table',
    order: 1,
  },
})

const activeName = ref('first')

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const columns: TableProColumn[] = [
  {
    prop: 'date',
    label: 'Date',
  },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'address',
    label: 'Address',
  },
  {
    prop: 'operation',
    label: 'Operation',
    defaultSlot: (props) => {
      return (
        <>
          <el-button size="small" onClick={() => handleEdit(props)}>
            Edit
          </el-button>
          <el-button size="small" type="danger" onClick={() => handleDelete(props)}>
            Delete
          </el-button>
        </>
      )
    },
  },
]

const tableData2 = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]
const columns2: TableProColumn[] = [
  {
    prop: 'date',
    label: 'Date',
  },
  {
    label: 'Delivery Info',
    children: [
      {
        prop: 'name',
        label: 'Name',
      },
      {
        label: 'Address Info',
        children: [
          {
            prop: 's  tate',
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
        ],
      },
    ],
  },
  {
    label: 'Operation',
    defaultSlot: (props) => {
      return (
        <>
          <el-button
            type="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              handleEdit(props)
            }}
          >
            Edit
          </el-button>
          <el-button
            type="danger"
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(props)
            }}
          >
            Delete
          </el-button>
        </>
      )
    },
  },
]

const handleEdit = (props: any) => {
  console.log('edit', props)
}

const handleDelete = (props: any) => {
  console.log('delete', props)
}

const handleRowClick = (row: any, column: any, event: Event) => {
  console.log('row-click', row, column, event)
}

const handlePageSizeChange = (size: number) => {
  console.log('page-size-change', size)
}

const handlePageCurrentChange = (current: number) => {
  console.log('page-current-change', current)
}

const handlePageChange = (current: number, size: number) => {
  console.log('page-change', current, size)
}

const handlePagePrevClick = (current: number) => {
  console.log('page-prev-click', current)
}

const handlePageNextClick = (current: number) => {
  console.log('page-next-click', current)
}
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="基础表格" name="first">
      <TablePro
        :data="tableData"
        :columns="columns"
        adaptive
        drag-column
        drag-row
        @page-size-change="handlePageSizeChange"
        @page-current-change="handlePageCurrentChange"
        @page-change="handlePageChange"
        @page-prev-click="handlePagePrevClick"
        @page-next-click="handlePageNextClick"
      ></TablePro>
    </el-tab-pane>
    <el-tab-pane label="多级表头" name="second">
      <TablePro :data="tableData2" :columns="columns2" @row-click="handleRowClick"></TablePro>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped></style>
