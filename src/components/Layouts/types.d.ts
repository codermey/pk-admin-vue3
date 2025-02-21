import type { AvatarMenuProps } from '../Avatar/types'
import type { LocaleItem } from '../Themes/types'

export interface HeaderProps extends Partial<AvatarMenuProps> {
  collapsed?: boolean
  locales: LocaleItem[]
}
