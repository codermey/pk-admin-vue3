import { fileURLToPath, URL } from 'node:url'

import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

/**
 * @description 过滤掉element-plus中不需要的locale文件
 * @param id
 */
function externalElementPlusLocale(id: string) {
  const localesDir = path.resolve(__dirname, 'locales')
  const localeFiles = fs.readdirSync(localesDir).map((file) => file.match(/([\w-]*)\.json$/)?.[1] || '')

  if (id.includes('element-plus/dist/locale')) {
    const basename = path.basename(id, '.mjs')
    return !localeFiles.some((file) => file.toLowerCase() === basename)
  }

  return false
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: externalElementPlusLocale,
    },
  },
  plugins: [
    VueI18nPlugin({
      compositionOnly: true,
      include: [path.resolve(__dirname, './locales/**')],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: {
        full: true,
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: 'fill',
            },
          },
        ],
      },
    }),
    VueRouter(),
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', VueRouterAutoImports, '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      collapseSamePrefixes: true,
      resolvers: [ElementPlusResolver()],
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
