<script setup lang="ts">
import { omit } from 'lodash'
import type { TableProColumn } from './types'

const props = defineProps<TableProColumn>()

const resetProps = omit(props, ['children', 'headerSlot', 'defaultSlot'])
</script>

<template>
  <el-table-column v-if="children" v-bind="resetProps">
    <TableColumn v-for="(column, index) in children" :key="index" v-bind="column" />
  </el-table-column>

  <el-table-column v-else v-bind="resetProps">
    <template v-if="headerSlot" #header="scope">
      <component :is="headerSlot" v-bind="scope" />
    </template>

    <template v-if="defaultSlot" #default="scope">
      <component :is="defaultSlot" v-bind="scope" />
    </template>
  </el-table-column>
</template>

<style scoped></style>
