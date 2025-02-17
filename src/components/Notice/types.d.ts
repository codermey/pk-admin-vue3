import type { IconifyIcon, IconProps } from '@iconify/vue'
import type { AvatarProps, BadgeProps, TagProps } from 'element-plus'

export interface NotificationProps extends Partial<BadgeProps> {
  icon?: string | IconifyIcon
  size?: number
  color?: string
  scale?: number
  iconColor?: string
  iconSize?: number
}

export interface MessageListItem {
  avatar?: Partial<AvatarProps>
  tagProps?: TagProps
  tag?: string
  title?: string
  content?: string
  time?: string
}

export interface NoticeMessageListOptions {
  title?: string
  messageList?: MessageListItem[]
}

export interface NoticeActionsItem extends IconProps {
  text?: string
  click?: () => void
}

export interface NoticeMessageListProps {
  list: NoticeMessageListOptions[]
  actions: NoticeActionsItem[]
  wrapperClass?: string
  wrapperStyle?: CSSPerspective
}

export interface NoticeProps extends NoticeMessageListProps, Partial<NotificationProps> {}
