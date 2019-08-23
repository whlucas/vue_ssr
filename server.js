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
server.get('/api/getMsg', (req, res) => {
    res.send('send Msg')
})

server.get('*', (req, res) => {
    let config = {url: req.url}
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

