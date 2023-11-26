import { createRouter, createWebHashHistory } from 'vue-router'

export const routes =  [
    {
        path: "/",
        name: "one",
        component: () => import('@/page/one/index.vue')
    },
    {
        path: "/two",
        name: "two",
        component: () => import('@/page/two/index.vue')
    },
    {
        path: "/three",
        name: "three",
        component: () => import('@/page/three/index.vue')
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