import './assets/main.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'

import { createApp, type Plugin } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue as Plugin)
app.use(ToastService)
app.use(ConfirmationService)

// Registrar componentes globalmente
app.component('ConfirmDialog', ConfirmDialog)
app.component('Toast', Toast)
app.component('Dialog', Dialog)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('DataTable', DataTable)
app.component('Column', Column)

app.mount('#app')
