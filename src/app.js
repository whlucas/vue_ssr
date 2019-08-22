import Vue from 'vue'
import App from './app.vue'
import createStore from './store.js'
import createRouter from './router.js'

// 工厂模式导出一个函数
export function createApp(){
    return new Vue({
        render: createElement => createElement(App),
        router: createRouter(),
        store: createStore()
    })
}