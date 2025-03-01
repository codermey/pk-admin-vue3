<script lang="ts" setup>
import type { NoticeActionsItem, NoticeMessageListOptions } from '@/components/Notice/types'
import type { TabsPaneContext } from 'element-plus'

definePage({
  meta: {
    title: 'pages.notice-message',
    icon: 'mdi:message',
  },
})

const exampleData: NoticeMessageListOptions[] = [
  {
    title: '系统通知',
    messageList: [
      {
        avatar: { src: 'https://example.com/avatar1.jpg' },
        tag: '紧急',
        title: '账户异常',
        content: '您的账户在尝试登录时发生异常，请尽快查看。',
        time: '2025-02-14 10:30',
      },
      {
        avatar: { src: 'https://example.com/avatar2.jpg' },
        tag: '信息',
        title: '更新通知',
        content: '新版本已发布，更新后可享受更多功能。',
        time: '2025-02-13 16:45',
      },
    ],
  },
  {
    title: '订单通知',
    messageList: [
      {
        avatar: { src: 'https://example.com/avatar3.jpg' },
        tag: '已完成',
        title: '订单 #1234 已完成',
        content: '您的订单 #1234 已成功配送。',
        time: '2025-02-12 09:00',
      },
    ],
  },
]

const actions: NoticeActionsItem[] = [
  {
    icon: 'ep:edit',
    text: '查看详情',
    click: () => {
      console.log('查看详情')
    },
  },
  {
    icon: 'ep:delete',
    text: '删除',
    click: () => {
      console.log('删除消息')
    },
  },
]

const handleTabClick = (pane: TabsPaneContext, ev: Event) => {
  console.log('tab click', pane, ev)
}
</script>

<template>
  <!-- <div class="p-4">
    <Notification color="#37f" :scale="1" />
  </div>
  <div class="p-4">
    <Notification color="#37f" :scale="1.5" />
  </div>
  <div class="p-4">
    <Notification color="#37f" :scale="0.5" />
  </div> -->

  <div class="p-4">
    <Notice :actions="actions" :list="exampleData" wrapper-class="w-75" @tab-click="handleTabClick" />
  </div>
</template>

<style scoped></style>
