 const http = require('http')
 const Vue = require('vue')
 const ServerRenderer = require('vue-server-renderer')

 // 生成一个html实例
 const app = new Vue({
    template: `<div>
                    <input v-model='val' />
                    <p>{{val}}</p>
                </div>`,
    data:{
        val: 'Server side Render'
    }
 })

 // 实例化一个renderer对象，里面有将vue对象转化成字符串的方法
 const renderer = ServerRenderer.createRenderer({
    //  这里创建的时候可以给他一个模板，在模板里面做一个标记，它就知道放哪了
     template: require('fs').readFileSync('./index.html','utf8')
 })


 
 const server = http.createServer((req, res) => {

    // 将这个app实例转化成字符串，最后吐到客户端
     renderer.renderToString(app, {
         init: '<script> var a = 10; console.log(a); </script>'
        }, (err, html) => {
        if(err){
            console.log(err)
        } else {
            res.end(html)
        }
     })
 })

 server.listen(8090)