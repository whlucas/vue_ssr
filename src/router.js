import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/home.vue'
import test from './components/test.vue'

Vue.use(VueRouter)

export default function () {
    return new VueRouter({
        mode: 'history', // 这里需要和后端交互，要用hostory模式
        routes: [
            {
                path: '/',
                component: test
            },
            {
                path: '/home',
                component: home
            }
        ]
    })
}