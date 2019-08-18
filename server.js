const express = require('express')
const http = require('http')
// const server = express()
const serverRenderer = require('vue-server-renderer')

// 拿到打包好的vue实例
const createApp = require('./dist/bundle.server.js')['default']

const renderer = serverRenderer.createRenderer({
    template: require('fs').readFileSync('./index.html','utf8')
})

const server = http.createServer((req, res) => {
    let app = createApp()
    renderer.renderToString(app, (err, html) => {
        if(err){
            console.log(err)
        } else {
            res.end(html)
        }
    })
})

server.listen(8090)

