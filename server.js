const express = require('express')
const server = express()
const serverRenderer = require('vue-server-renderer')

const createApp = require('./dist/bundle.server.js')['default']

const renderer = serverRenderer.createRenderer({
    template: require('fs').readFileSync('./index.html','utf8')
})
server.get('/dist/bundle.client.js', (req, res) => {  
    res.sendFile(__dirname + '/dist/bundle.client.js')
})

// 这里假设有一个请求数据的接口
server.get('/api/getMsg', (req, res) => {
    res.send('send Msg')
})

server.get('*', (req, res) => {
    let config = {url: req.url}

    // 这里create返回的是一个promise了，改一下
    createApp(config).then(app => {
        renderer.renderToString(app, {
            src: '<script src="/dist/bundle.client.js"></script>',
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

