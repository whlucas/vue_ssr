const http = require('http')
const serverRenderer = require('vue-server-renderer')

// 拿到打包好的vue实例
const createApp = require('./dist/bundle.server.js')['default']

// 拿到模板
const renderer = serverRenderer.createRenderer({
    template: require('fs').readFileSync('./index.html','utf8')
})

// 吐回给前端
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

