<script lang="ts" setup>
import type { AvatarProps, TabsPaneContext } from 'element-plus'
import type { MessageListItem, NoticeProps } from './types'

const props = defineProps<NoticeProps>()

const emits = defineEmits<{
  avatarClick: [avatar: Partial<AvatarProps>]
  messageClick: [content: MessageListItem]
  tabClick: [pane: TabsPaneContext, ev: Event]
}>()

const forwardedEvents = {
  avatarClick: (avatar: Partial<AvatarProps>) => emits('avatarClick', avatar),
  messageClick: (content: MessageListItem) => emits('messageClick', content),
  tabClick: (pane: TabsPaneContext, ev: Event) => emits('tabClick', pane, ev),
}

const filterProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { list, actions, ...resetProps } = props
  return resetProps
})
</script>

<template>
  <ElDropdown trigger="click">
    <Notification v-bind="filterProps" />
    <template #dropdown>
      <NoticeMessageList
        :actions="actions"
        :list="list"
        :wrapper-class="wrapperClass"
        :wrapper-style="wrapperStyle"
        v-on="forwardedEvents"
      />
    </template>
  </ElDropdown>
</template>

<style scoped></style>
