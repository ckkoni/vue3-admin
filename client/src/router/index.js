import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../layout/Layout.vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            { path: 'home', name: 'Home', component: Home },
            { path: 'user', name: 'User', component: User }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    //获取本地存储的token
    const token = localStorage.getItem('token');

    if (to.path !== '/login' && !token) {
        return '/login';
    } else {
        return true;
    }
})

export default router