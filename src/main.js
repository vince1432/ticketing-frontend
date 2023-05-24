import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'
import http from './utils/axios'

const app = createApp(App)

app.use(router)
app.use(store)
app.provide('$http', http)
app.provide('$store', store)
app.mount('#app')
