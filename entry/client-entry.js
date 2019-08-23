import {createApp} from '../src/app.js'

let app = createApp()

// 在页面中将window上的state写到store里面去
if(window.__STATE__){
    app.$store.replaceState(window.__STATE__)
}

window.onload = function () {
    app.$mount('.wrapper')
}