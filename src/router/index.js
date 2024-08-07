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