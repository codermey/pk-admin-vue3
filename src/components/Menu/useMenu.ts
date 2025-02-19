import type { AppRouteMenuItem } from './types'

export const useMenu = () => {
  const generateMenuKey = (menus: AppRouteMenuItem[], level = '1') => {
    const filterMenus = menus
      .filter((menu) => !menu.meta?.hideMenu)
      .sort((a, b) => (a.meta?.order ?? 1000) - (b.meta?.order ?? 1000))

    let i = 1
    filterMenus.forEach((menu) => {
      const key = level.indexOf('-') !== -1 ? `${level}${i}` : `${i}`
      menu.meta = {
        ...menu.meta,
        key,
      }
      i++
      if (menu.children && menu.children.length) {
        return (menu.children = generateMenuKey(menu.children, `${key}-`))
      }
    })
    return filterMenus
  }

  const getIndex = (menu: AppRouteMenuItem): string => {
    return `${menu.meta?.key}`
  }

  const menuHasChildren = (menu: AppRouteMenuItem): boolean => {
    return !menu.meta?.hiddenMenu && Array.isArray(menu.children) && !!menu.children.length
  }

  return {
    generateMenuKey,
    getIndex,
    menuHasChildren,
  }
}
