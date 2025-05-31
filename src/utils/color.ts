/**
 * 调整颜色的明暗度
 * @param color 十六进制颜色值 例如: '#ffffff' 或 '#fff'
 * @param rate 调整比率 -1到1之间，负数变暗，正数变亮
 * @returns 调整后的颜色值
 * @example
 * darken('#000000', 0.2) // 变亮20% => '#333333'
 * darken('#ffffff', -0.2) // 变暗20% => '#cccccc'
 */
export const darken = (color: string, rate: number): string => {
  // 验证rate范围
  rate = Math.max(-1, Math.min(1, rate))

  // 去掉#号并统一转为6位色值
  let hex = color.replace('#', '')
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // 将16进制转换为RGB
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // 根据rate调整RGB值
  const adjust = (value: number): number => {
    if (rate > 0) {
      // 变亮：当前色值 + (255 - 当前色值) * rate
      return Math.round(value + (255 - value) * rate)
    } else {
      // 变暗：当前色值 * (1 + rate)
      return Math.round(value * (1 + rate))
    }
  }

  // 调整每个颜色通道
  const newR = adjust(r)
  const newG = adjust(g)
  const newB = adjust(b)

  // 转回16进制，并确保两位数
  const toHex = (n: number): string => {
    const hex = Math.max(0, Math.min(255, n)).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
}

/**
 * 判断是否为颜色值
 * @param value
 * @returns
 */
export const isColor = (value: string) => {
  if (typeof value !== 'string') return false

  const style = new Option().style
  style.color = value
  return style.color !== ''
}
