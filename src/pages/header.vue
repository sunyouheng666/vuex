<template>
    <mt-header title="问答">
        <router-link to="/search" slot="left">
            <mt-button icon="search">{{searchTitle}}</mt-button>
        </router-link>
        <mt-button to="/ask" slot="right">
            <mt-button icon="ask">提问</mt-button>
        </mt-button>
    </mt-header>
</template>
<script>
    export default {
        data() {
            return {
                searchLeft: 'searchLeft',
                searchTitle: '搜索',
            }
        },
        methods: {
            handleClose: function() {
                this.$indicator.open('加载中...');
            }
        }
    }
</script>
<style scoped>
    h1,h2 {font-weight: normal;}
    ul { list-style-type: none;padding: 0;}
    li {display: inline-block; margin: 0 10px;}
    a {color: #42b983;}
</style>