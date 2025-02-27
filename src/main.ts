import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './modules/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
