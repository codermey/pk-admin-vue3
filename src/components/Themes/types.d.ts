import type { IconifyIcon, IconProps } from '@iconify/vue'

export interface LocaleItem {
  /**
   * @description 显示文本 例如 中文、English
   */
  text: string
  /**
   * @description 文件夹名称（locale） 例如 en、zh-CN
   */
  name: string
  /**
   * @description 图标
   */
  icon: string | IconifyIcon
}

export interface ChangeLocaleProps extends Partial<IconProps> {
  locales: LocaleItem[]
  iconClass?: string
}
