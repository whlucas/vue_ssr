<template>
    <div class="wrapper">
        <p>{{ msg }}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name: 'Vue'
        }
    },
    computed: {
        msg() {
            return this.$store.state.msg
        }
    },

    // 前端请求的做法
    // created() {
    //     this.$store.dispatch('getMsg')
    // }

    // 这里交给后端去调这个方法
    serverRequest(store) {
        return store.dispatch('getMsg')
    }
}
</script>