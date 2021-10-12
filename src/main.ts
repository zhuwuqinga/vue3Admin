import { createApp } from 'vue'
import App from './App.vue'
// import { ElButton } from 'element-plus'
import ElementPlus from 'element-plus'
import router from './router'
import { store } from './store'
import './permission'
// 使用element
// import ElementPlus from 'element-plus';
// import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

// 分页组件
import PageNation from './components/pageNation/Index.vue'
// 下载组件
import DownLoad from './components/downLoad/DownLoad.vue'

// 自定义主题
// import './styles/element-variables.scss'
const app = createApp(App)

app.use(router)
app.use(store)

app
.component('PageNation', PageNation)
.component('DownLoad', DownLoad)
.use(ElementPlus, {size: 'small'})
.mount('#app')
