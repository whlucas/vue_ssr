const express = require('express')
const server = express()
const serverRenderer = require('vue-server-renderer')

const createApp = require('./dist/bundle.server.js')['default']

const renderer = serverRenderer.createRenderer({
    template: require('fs').readFileSync('./index.html','utf8')
})


server.get('*', (req, res) => {

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

