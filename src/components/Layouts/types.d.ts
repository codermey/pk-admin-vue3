import type { AvatarMenuProps } from '../Avatar/types'
import type { LocaleItem, ThemeSettingsProps } from '../Themes/types'

export interface HeaderProps extends Partial<AvatarMenuProps> {
  locales: LocaleItem[]
  settings?: ThemeSettingsProps
}
