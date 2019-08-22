 const http = require('http')
 const Vue = require('vue')
 const ServerRenderer = require('vue-server-renderer')
 const app = new Vue({
    template: `<div>
                    <input v-model='val' />
                    <p>{{val}}</p>
                </div>`,
    data:{
        val: 'Server side Render'
    }
 })

 // 用这个包的toString方法把他转到
 const renderer = ServerRenderer.createRenderer({
    //  这里创建的时候可以给他一个模板，在模板里面做一个标记，它就知道放哪了
     template: require('fs').readFileSync('./index.html','utf8')
 })

 const server = http.createServer((req, res) => {
     renderer.renderToString(app, {
         init: '<script> var a = 10; console.log; </script>'
        }, (err, html) => {
        if(err){
            console.log(err)
        } else {
            res.end(html)
        }
     })
 })
 server.listen(8090)