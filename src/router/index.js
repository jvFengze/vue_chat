import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'login',
        // redirect: '/login',
        component: () => import('../views/login/index.vue')
    },
    {
        path:'/main',
        name: 'main',
        component: () => import('../views/main/index.vue')
    },
    {
        path:'/myself',
        name: 'myself',
        component: () => import('../views/myselfContent/index.vue')
    },
    {
        path: '/personCenter', 
        name: 'personCenter',
        component: () => import('../views/personCenter/index.vue')
    }
]
 const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router