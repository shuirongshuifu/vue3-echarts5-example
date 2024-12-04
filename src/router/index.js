import { createRouter, createWebHashHistory } from 'vue-router'

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
        name: "某某",
        component: () => import('@/page/17/index.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// // 去除重复路由报错的问题
// const originalPush = router.push
// router.push = function push(location) {
//     return originalPush.call(this, location).catch((err) => err)
// }

export default router