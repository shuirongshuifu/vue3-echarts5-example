import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

import VueCropper from 'vue-cropper';
import 'vue-cropper/dist/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'

import install from './directives' // 引入并使用自定义指令

// 引入开关方法
import { openDialog, closeDialog } from './command/dialogService/dialogService.js';

const app = createApp(App)

// 使用provide来提供dialogService的开关方法，那么任意子组件，就可以inject使用之了
app.provide('dialogService', { openDialog, closeDialog });

for (const name in ElIcons) {
    app.component(name, ElIcons[name])
}

app.use(install)

app.use(router)
app.use(ElementPlus)

app.use(VueCropper)

app.mount('#app')
