import { createRouter, createWebHistory } from 'vue-router'

export const routes =  [
    {
        path: "/",
        name: "地图下钻",
        component: () => import('@/page/one/index.vue')
    },
    {
        path: "/two",
        name: "表头吸顶",
        component: () => import('@/page/two/index.vue')
    },
    {
        path: "/three",
        name: "元素吸顶",
        component: () => import('@/page/three/index.vue')
    },
    {
        path: "/four",
        name: "Shift多选(普通)",
        component: () => import('@/page/four/index.vue')
    },
    {
        path: "/five",
        name: "Shift多选(hook)",
        component: () => import('@/page/five/index.vue')
    },
    {
        path: "/six",
        name: "driver.js示例",
        component: () => import('@/page/six/index.vue')
    },
    {
        path: "/seven",
        name: "html2canvas",
        component: () => import('@/page/seven/index.vue')
    },
    {
        path: "/eight",
        name: "仿vue的{{}}",
        component: () => import('@/page/eight/index.vue')
    },
    {
        path: "/nine",
        name: "仿vue的:style",
        component: () => import('@/page/nine/index.vue')
    },
    {
        path: "/ten",
        name: "xgplayer",
        component: () => import('@/page/ten/index.vue')
    },
    {
        path: "/11",
        name: "视频不可拖拽",
        component: () => import('@/page/11/index.vue')
    },
    {
        path: "/12",
        name: "修改饿了么源码",
        component: () => import('@/page/12/index.vue')
    },
    {
        path: "/13",
        name: "tree的箭头",
        component: () => import('@/page/13/index.vue')
    },
    {
        path: "/14",
        name: "裁剪",
        component: () => import('@/page/14/index.vue')
    },
    {
        path: "/15",
        name: "live2d-render",
        component: () => import('@/page/15/index.vue')
    },
    {
        path: "/16",
        name: "pixi-live2d-display",
        component: () => import('@/page/16/index.vue')
    },
    {
        path: "/17",
        name: "lottery彩票",
        component: () => import('@/page/17/index.vue')
    },
    {
        path: "/18",
        name: "命令式弹框",
        component: () => import('@/page/18/index.vue')
    },
    {
        path: "/19",
        name: "音频&字幕",
        component: () => import('@/page/19/index.vue')
    },
    {
        path: "/20",
        name: "el-table单选",
        component: () => import('@/page/20/index.vue')
    },
    {
        path: "/21",
        name: "点击外部区域",
        component: () => import('@/page/21/index.vue')
    },
    {
        path: "/22",
        name: "zip解压",
        component: () => import('@/page/22/index.vue')
    },
    {
        path: "/23",
        name: "鱼骨图",
        component: () => import('@/page/23/index.vue')
    },
    {
        path: "/24",
        name: "穿梭框",
        component: () => import('@/page/24/index.vue')
    },
    {
        path: "/25",
        name: "数字跑马灯",
        component: () => import('@/page/25/index.vue')
    },
    {
        path: "/26",
        name: "小车道路动画",
        component: () => import('@/page/26/index.vue')
    },
    {
        path: "/27",
        name: "animation事件",
        component: () => import('@/page/27/index.vue')
    },
    {
        path: "/28",
        name: "拖拽示例1",
        component: () => import('@/page/28/index.vue')
    },
    {
        path: "/29",
        name: "拖拽示例2",
        component: () => import('@/page/29/index.vue')
    },
    {
        path: "/30",
        name: "方向键切换",
        component: () => import('@/page/30/index.vue')
    },
    {
        path: "/31",
        name: "两种方式星号高亮",
        component: () => import('@/page/31/index.vue')
    },
    {
        path: "/32",
        name: "tab刷新状态保留",
        component: () => import('@/page/32/index.vue')
    },
]

const router = createRouter({
    // history: createWebHistory('/extraPro'),
    history: createWebHistory(),
    routes
})

// // 去除重复路由报错的问题
// const originalPush = router.push
// router.push = function push(location) {
//     return originalPush.call(this, location).catch((err) => err)
// }

export default router