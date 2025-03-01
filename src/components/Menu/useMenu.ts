import type { AppRouteMenuItem } from './types'

export const useMenu = () => {
  const filterAndOrderMenus = (menus: AppRouteMenuItem[]) => {
    return menus
      .filter((menu) => !menu.meta?.hideMenu)
      .sort((a, b) => (a.meta?.order ?? 1000) - (b.meta?.order ?? 1000))
      .map((menu) => ({ ...menu }))
  }

  const generateMenuKey = (menus: AppRouteMenuItem[], level = '1') => {
    const filterMenus = filterAndOrderMenus(menus)

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

  // 获取顶级菜单
  const getTopMenus = (menus: AppRouteMenuItem[]) => {
    return filterAndOrderMenus(menus).map((menu) => {
      delete menu.children
      return menu
    })
  }

  // 获取子级菜单
  const getSubMenus = (menus: AppRouteMenuItem[]) => {
    const route = useRoute()
    const path = computed(() => {
      const rootPath = route.path.split('/')[1]
      return rootPath ? `/${rootPath}` : '/'
    })

    return filterAndOrderMenus(menus).find((menu) => menu.path === path.value)?.children || []
  }

  const getMenuItemCondition = (
    menus: AppRouteMenuItem[],
    fn: (menu: AppRouteMenuItem) => boolean,
  ): AppRouteMenuItem | undefined => {
    for (const menu of menus) {
      if (fn(menu)) {
        return menu
      } else if (menu.children && Array.isArray(menu.children)) {
        const menuItem = getMenuItemCondition(menu.children, fn)
        if (menuItem) return menuItem
      }
    }
  }

  const getMenuItem = (menus: AppRouteMenuItem[], key: string): AppRouteMenuItem | undefined => {
    return getMenuItemCondition(menus, (menu) => menu.meta?.key === key)
  }

  // 获取当前需要open的子菜单信息
  const getParentMenu = (menus: AppRouteMenuItem[]) => {
    const route = useRoute()
    const path = computed(() => route.path)
    return getMenuItemCondition(menus, (menu) => {
      const arr = path.value.split('/')
      if (arr.length < 3) return false
      arr.pop()
      return menu.name === arr.join('/')
    })
  }

  // 获取当前激活的菜单
  const getActiveMenu = (menus: AppRouteMenuItem[]): AppRouteMenuItem | undefined => {
    const route = useRoute()
    const path = computed(() => route.path)
    return getMenuItemCondition(menus, (menu) => menu.name === path.value)
  }

  const getIndex = (menu: AppRouteMenuItem): string => {
    return `${menu.meta?.key}`
  }

  const menuHasChildren = (menu: AppRouteMenuItem): boolean => {
    return !menu.meta?.hiddenMenu && Array.isArray(menu.children) && !!menu.children.length
  }

  return {
    generateMenuKey,
    getTopMenus,
    getSubMenus,
    getIndex,
    getMenuItem,
    menuHasChildren,
    getParentMenu,
    getActiveMenu,
  }
}
