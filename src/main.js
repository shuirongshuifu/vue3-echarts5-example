import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
const app = createApp(App)

for (const name in ElIcons) {
    app.component(name, ElIcons[name])
}

import install from './directives' // 引入并使用自定义指令
app.use(install)

app.use(router)
app.use(ElementPlus)

app.use(VueCropper)

app.mount('#app')
