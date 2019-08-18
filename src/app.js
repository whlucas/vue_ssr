import Vue from 'vue'
import App from './app.vue'

// 工厂模式导出一个函数
export function createApp(){
    return new Vue({
        render: createElement => createElement(App)
    })
}