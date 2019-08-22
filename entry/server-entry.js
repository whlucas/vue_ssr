import { createApp } from '../src/app.js'

export default function (config) {
    let app = createApp()
    // 这里渲染指定的路由里面的东西
    app.$router.push(config.url)
    return app
}
