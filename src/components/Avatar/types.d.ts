import type { ButtonType, Options, ButtonProps, AvatarProps } from 'element-plus'

export interface DropdownProps {
  trigger: 'click' | 'contextmenu' | 'focus' | 'hover'
  triggerKeys: string[]
  effect: string
  type?: ButtonType
  placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  popperOptions: Partial<Options>
  id: string
  size: string
  splitButton: boolean
  hideOnClick: boolean
  loop: boolean
  showTimeout: number
  hideTimeout: number
  tabindex: number | string
  maxHeight: number | string
  popperClass: string
  disabled: boolean
  role: string
  buttonProps?: ButtonProps
  teleported: boolean
  persistent: boolean
}

export type DropdownMenuItem = string | number | { key: string | number | object; value: string }

export interface AvatarMenuProps extends Partial<Omit<DropdownProps, 'size'>>, Partial<AvatarProps> {
  menuSize?: string | 'small' | 'default' | 'large'
  username?: string
  data?: DropdownMenuItem[]
}
