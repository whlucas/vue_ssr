// 重新挂一遍，激活页面
import {createApp} from '../src/app.js'

let app = createApp()

// 拿到我创建好的vue挂载到app中的这个dom上去
window.onload = function () {
    app.$mount('.wrapper') 
}