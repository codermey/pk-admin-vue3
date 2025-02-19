/**
 * @description: 添加单位默认（rpx）
 * @param value 数值
 * @param type 单位类型
 */
export const addUnit = (value: string | number, type = 'px') => {
  return typeof value === 'number' ? `${value}${type}` : value
}
