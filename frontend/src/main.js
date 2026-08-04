import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

// Set the base URL for backend API calls
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.defaults.withCredentials = true // Important for sending/receiving refresh token cookies

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
