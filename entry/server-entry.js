// 这个文件是为了返回一个能够创建vue实例的方法，或者直接返回一个vue实例

// 拿到这个方法
import { createApp } from '../src/app.js'

export default function (config) {
    // 最外面加一个promise，请求完事了以后resolve，把app返回
    return new Promise((resolve, reject) => {
        let app = createApp()
        app.$router.push(config.url)

        // 拿到所有请求中匹配到的组件
        let components = app.$router.getMatchedComponents()

        // 不知道哪些个组件需要请求数据且异步，Promise.all
        Promise.all(components.map(component => {
            if(component.serverRequest){
                // 执行组件里面的serverRequest，请求数据
                return component.serverRequest(app.$store)
            } else {
                return {code: 404}
            }
        })).then(() => {

            // 都请求完事了把这个app返回
            resolve(app)
        }).catch((err) => reject(err))
    })
}
