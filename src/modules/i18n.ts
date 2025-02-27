import type { App } from 'vue'
import { createI18n, type Locale } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale,
  ]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

const elementPlusLocalesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../node_modules/element-plus/dist/locale/*.mjs')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.mjs$/)?.[1],
    loadLocale,
  ]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const filterElementPlusLocalesMap = availableLocales.reduce(
  (acc: Record<Locale, () => Promise<{ default: Record<string, string> }>>, locale: Locale) => {
    return {
      ...acc,
      [locale]: elementPlusLocalesMap[locale.toLowerCase()],
    }
  },
  {},
)

const loadedLanguages: string[] = []

export function setI18nLanguage(locale: string) {
  i18n.global.locale.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}

export async function loadLocaleMessages(lang: string) {
  if (i18n.global.locale.value === lang || loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang)
  }

  // load locale messages with dynamic import
  const messages = await localesMap[lang]()
  const elementPlusMessages = await filterElementPlusLocalesMap[lang]()

  // set locale and locale message
  i18n.global.setLocaleMessage(lang, {
    ...messages.default,
    ...elementPlusMessages.default,
  })
  loadedLanguages.push(lang)

  return setI18nLanguage(lang)
}

export default {
  install(app: App) {
    app.use(i18n)
    loadLocaleMessages('zh-CN')
  },
}
