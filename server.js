const express = require('express')
const server = express()
const serverRenderer = require('vue-server-renderer')

const createApp = require('./dist/bundle.server.js')['default']

const renderer = serverRenderer.createRenderer({
    template: require('fs').readFileSync('./index.html','utf8')
})


server.get('*', (req, res) => {
    let config = {url: req.url}
    // 在服务端拿到切换的路由，把这个路由传到前端的createapp里面去，让他去渲染相应的组件
    let app = createApp(config)
    renderer.renderToString(app, (err, html) => {
        if(err){
            console.log(err)
        } else {
            res.end(html)
        }
    })
})

server.listen(8090)

