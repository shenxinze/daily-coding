import { createApp } from 'vue'
import './style.css'

import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { locale })

app.mount('#app')
