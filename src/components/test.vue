<template>
    <div class="wrapper">
        <input type="text" v-model="name">
        <hr>
        <p>{{name}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name: 'Vue'
        }
    }
}
</script>