export interface NetIconProps {
  url?: string
  prefix?: string
  fontFamily?: string
  name: string
}

export interface IconListProps {
  showText?: boolean
  collection?: string
  iconClass?: string
  itemClass?: string
  activeClass?: string
  iconData?: string[]
}

export interface IconPickerConfirmType {
  icon: string
  fontSize: number
  color: string
}
