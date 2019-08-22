const express = require('express')
// const http = require('http')
const server = express()
const serverRenderer = require('vue-server-renderer')

// 拿到打包好的vue实例
const createApp = require('./dist/bundle.server.js')['default']

const renderer = serverRenderer.createRenderer({
    template: require('fs').readFileSync('./index.html','utf8')
})
server.get('/dist/bundle.client.js', (req, res) => {  // 当我们请求这个的时候，用sendFile的形式进行返回，这里用来激活页面
    res.sendFile(__dirname + '/dist/bundle.client.js')
})
server.get('/api/getMsg', (req, res) => {
    res.send('send Msg')
})

server.get('*', (req, res) => {
    let config = {url: req.url}
    // 在服务端拿到切换的路由，把这个路由传到前端的createapp里面去，让他去渲染相应的组件
    createApp(config).then(app => {

        // 在这个里面把config.state存一下
        let state = JSON.stringify(config.state)

        renderer.renderToString(app, {
            src: '<script src="/dist/bundle.client.js"></script>',
            // 把store里面的state挂到window上
            init: `<script>window.__STATE__=${state}</script>`
        }, (err, html) => {
            if(err){
                console.log(err)
            } else {
                res.send(html)
            }
        })
    })
})

server.listen(8090)

