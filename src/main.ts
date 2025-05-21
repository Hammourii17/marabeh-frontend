import { createApp } from 'vue'
import App from "./App.vue"
import './assets/css/index.scss'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { messages } from './utils/locales'
import useModals from '@/components/modal/modal'

// @ts-ignore
import initPlugins from '~/plugins/index'
// @ts-ignore
import { router } from '~/router'

const pinia = createPinia()

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'ru',
  messages,
})

export const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(initPlugins)

app.config.globalProperties.$notify = (n: any) => {
  useNotifications.show({ type: n.type, title: n.title, description: n.text })
}

app.config.globalProperties.$modal = {
  show: (a: any, b: any, c: any, d: any) => {
    useModals.show({
      a,
      b,
      c,
      d,
    })
  },
  close: () => {
    useModals.close()
  },
}

app.config.globalProperties.$i18n = i18n

await router.isReady()

app.mount('#app');
