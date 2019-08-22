// 重新挂一遍，激活页面
import {createApp} from '../src/app.js'

let app = createApp()

// 在页面中将window上的state写到store里面去
if(window.__STATE__){
    app.$store.replaceState(window.__STATE__)
}

window.onload = function () {
    app.$mount('.wrapper') // 挂载到app中的这个dom上去
}