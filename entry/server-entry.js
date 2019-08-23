
import { createApp } from '../src/app.js'

export default function (config) {
    return new Promise((resolve, reject) => {
        let app = createApp()
        app.$router.push(config.url)

        let components = app.$router.getMatchedComponents()

        Promise.all(components.map(component => {
            if(component.serverRequest){
                return component.serverRequest(app.$store)
            } else {
                return {code: 404}
            }
        })).then(() => {
            // 这个时候服务器返回给我们的数据是没有问题的，他返回给我们的我们要渲染的app实例里面的store的值是请求回来的
            // 但是浏览器这边加上去的那一层，在引入js的时候会把原先的值覆盖
            // 再把请求后store里面的值挂到传进来的config
            config.state = app.$store.state
            resolve(app)
        }).catch((err) => reject(err))
    })
}
