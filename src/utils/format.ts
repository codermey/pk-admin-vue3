/**
 * 将 kebab-case 转换为 camelCase
 * @param str 字符串
 * @returns 转换后的字符串
 */
export const kebabToCamel = (str: string) => {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}

/**
 * 将 camelCase 转换为 kebab-case
 * @param str 字符串
 * @returns 转换后的字符串
 */
export const camelToKebab = (str: string) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export const forwardEmitEvents = (emits: any, events: string[], prefix = '') => {
  const forwardEmits: Record<string, (...args: any[]) => void> = {}

  events.forEach((event) => {
    const camelEvent = kebabToCamel(event)

    forwardEmits[camelEvent] = (...args: any[]) => {
      emits(`${prefix}${event}`, ...args)
    }
  })

  return forwardEmits
}

export const forwardExposeEvents = (ref: Ref, events: string[]) => {
  const exposeMethods: Record<string, (...args: any[]) => void> = {}

  events.forEach((event) => {
    exposeMethods[event] = (...args: any[]) => {
      if (ref.value && typeof ref.value[event] === 'function') {
        ref.value[event](...args)
      }
    }
  })

  return exposeMethods
}
