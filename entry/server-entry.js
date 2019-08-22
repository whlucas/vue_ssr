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
                return component.serverRequest(app.$store)
            } else {
                return {code: 404}
            }
        })).then(() => {
            // 这个时候服务器返回给我们的数据是没有问题的，他返回给我们的我们要渲染的app实例里面的store的值是请求回来的
            // 但是浏览器这边加上去的那一层，在引入js的时候会把原先的值覆盖
            // 再把请求后store里面的值在传回去
            // config.state = app.$store.state

            // 都请求完事了把这个app返回
            resolve(app)
        }).catch((err) => reject(err))
    })
}

// 之后利用webpack对这个文件打包