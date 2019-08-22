import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default function () {
    return new Vuex.Store({
        state: {
            msg: 'Hello Vue'
        },
        mutations: {
            setMsg(state, msg){
                state.msg = msg
            }
        },
        actions: {
            getMsg({commit}){
                return axios.get('http://localhost:8090/api/getMsg')
                    .then(res => commit('setMsg', res.data))
            }
        }
    })
}