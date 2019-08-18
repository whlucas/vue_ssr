// 这个文件是为了返回一个能够创建vue实例的方法，或者直接返回一个vue实例

// 拿到这个方法
import { createApp } from '../src/app.js'

export default function () {
    return createApp()
}

// 之后利用webpack对这个文件打包