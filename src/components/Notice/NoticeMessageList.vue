<script lang="ts" setup>
import type { AvatarProps, TabsPaneContext } from 'element-plus'
import type { MessageListItem, NoticeMessageListProps } from './types'

const props = defineProps<NoticeMessageListProps>()

const emits = defineEmits<{
  avatarClick: [avatar: Partial<AvatarProps>]
  messageClick: [content: MessageListItem]
  tabClick: [pane: TabsPaneContext, ev: Event]
}>()

const activeName = ref(props.list[0].title)

const handleAvatarClick = (avatar: Partial<AvatarProps>) => {
  emits('avatarClick', avatar)
}
const handleMessageClick = (content: MessageListItem) => {
  emits('messageClick', content)
}
const handleTabClick = (pane: TabsPaneContext, ev: Event) => {
  emits('tabClick', pane, ev)
}
</script>

<template>
  <div>
    <ElTabs v-model="activeName" :class="wrapperClass" :style="wrapperStyle" @tab-click="handleTabClick">
      <ElTabPane v-for="(tab, index) in list" :key="index" :label="tab.title" :name="tab.title">
        <ElRow
          v-for="(item, i) in tab.messageList"
          :key="i"
          align="middle"
          class="cursor-pointer py-2 hover:bg-sky-100"
          justify="center"
        >
          <ElCol :span="4" align="middle">
            <ElAvatar v-bind="Object.assign({ size: 'small' }, item.avatar)" @click="handleAvatarClick(item.avatar!)" />
          </ElCol>
          <ElCol :span="20" @click="handleMessageClick(item)">
            <div class="mb-2 flex items-center gap-x-2">
              <span class="line-clamp-1 text-base">{{ item.title }}</span>
              <ElTag effect="dark" size="small" v-bind="item.tagProps">{{ item.tag }}</ElTag>
            </div>
            <div class="line-clamp-2 mb-2 text-sm text-gray-400">
              {{ item.content }}
            </div>
            <div class="text-sm text-gray-400">{{ item.time }}</div>
          </ElCol>
        </ElRow>
      </ElTabPane>
    </ElTabs>
    <div class="flex border-t">
      <div
        v-for="(action, index) in actions"
        :key="index"
        class="flex flex-1 cursor-pointer items-center justify-center gap-x-1 border-r py-3 text-gray-500 hover:bg-sky-100 last:border-0!"
      >
        <Iconify v-if="action.icon" :color="action.color" :icon="action.icon" :style="action.style" />
        <span>{{ action.text }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__nav-scroll) {
  padding: 0 0 0 10px;
}
</style>
