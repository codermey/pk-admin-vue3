<script lang="ts" setup>
import { useUserStore } from '@/stores'

definePage({
  meta: {
    title: 'pages.home',
    icon: 'mdi:home',
  },
})

const copyMsg = ref('')

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
</template>
