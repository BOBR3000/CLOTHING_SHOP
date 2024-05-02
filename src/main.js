import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'

import HomeWeb from './pages/HomeWeb.vue'
import FavoRites from './pages/FavoRites.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: HomeWeb, alias: "/" },
    { path: "/FavoRites", name: "FavoRites", component: FavoRites },
  ],
})


app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')
