// 重新挂一遍，激活页面
import {createApp} from '../src/app.js'

let app = createApp()

window.onload = function () {
    app.$mount('.wrapper') // 挂载到app中的这个dom上去
}