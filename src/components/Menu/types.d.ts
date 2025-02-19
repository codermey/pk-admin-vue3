import type { IconifyIcon } from '@iconify/vue'
import type { MenuProps as ElMenuProps, SubMenuProps as ElSubMenuProps } from 'element-plus'

type Component<T> = ReturnType<typeof defineComponent<T>> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>)

export interface RouteMate extends Record<string | number | symbol, unknown> {
  layout?: boolean
  title?: string
  order?: number
  icon?: string | IconifyIcon
  hideMenu?: boolean
  disabled?: boolean
}

export interface AppRouteMenuItem {
  name?: string | symbol
  path: string
  children?: AppRouteMenuItem[]
  alias?: string
  meta?: RouteMate
  component?: Component
}

export interface IconOptions {
  style?: CSSProperties
  class?: string
}

export interface MenuProps extends Partial<ElMenuProps> {
  menus: AppRouteMenuItem[]
  subMenuProps?: Partial<ElSubMenuProps>
  iconProps?: IconOptions
}

export interface SubMenuProps extends Partial<ElSubMenuProps> {
  data: AppRouteMenuItem
  collapse?: boolean
}

export interface MenuItemProps {
  data: AppRouteMenuItem
  collapse?: boolean
}
