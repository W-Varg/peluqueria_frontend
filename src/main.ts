import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BlockViewer from './components/BlockViewer.vue'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import '@/config/axios'  // Import Axios configuration

import { ConfirmationService, ToastService } from 'primevue'
import { useAuthStore } from '@/stores/auth'

import './assets/styles.scss'
import './assets/main.css'

const app: VueApp = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.component('BlockViewer', BlockViewer)

// Initialize auth state
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
