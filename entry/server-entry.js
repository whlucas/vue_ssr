// 这个文件是为了返回一个能够创建vue实例的方法，或者直接返回一个vue实例

// 拿到这个方法
import { createApp } from '../src/app.js'

export default function (config) {
    // 这里的做法是服务器端对请求进行处理每次请求创建一个新的实例，对应一个新的页面
    let app = createApp()
    // 这里渲染指定的路由里面的东西
    app.$router.push(config.url)
    return app
}

// 之后利用webpack对这个文件打包