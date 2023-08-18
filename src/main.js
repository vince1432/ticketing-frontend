import { Loading, Notify, Quasar } from 'quasar'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Import sweet alert css
import 'sweetalert2/dist/sweetalert2.min.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

// icons
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import iconSet from 'quasar/icon-set/fontawesome-v6'

import './style.css'

const app = createApp(App)

app.use(router)
app.use(Quasar,{
	iconSet: iconSet,
	plugins: { Notify, Loading }
})
app.use(store)
app.provide('$store', store)
app.mount('#app')
