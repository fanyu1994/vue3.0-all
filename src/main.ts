import Vue, { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './style/index.less'
import 'uno.css'
import { createPinia } from 'pinia'
import Router from './route'
import * as echarts from 'echarts'

// import { mocker } from './mock/index'
// console.log(import.meta.env)

// if (import.meta.env.MODE === 'development') {
//   mocker.start()
// }

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(createPinia())
app.use(Router)
app.mount('#app')
