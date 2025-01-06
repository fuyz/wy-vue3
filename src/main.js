import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(router).use(Vant).use(Lazyload).use(store)

app.mount('#app')
