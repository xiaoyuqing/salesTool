<template>
    <navfilter></navfilter>
    <div class="developing">
        <img src="./assets/img/developing@2x.png" alt="">
        <p>正在开发中，敬请期待...</p>
    </div>
</template>
<script>
     import navfilter from './components/navfilter'
     export default{
         components:{
             navfilter
         }
     }
</script>
<style lang="less">
    .developing{
        img{
            display:block;
            margin:200px auto 0;
        }
        p{
            text-align:center;
            margin-top:100px;
        }
    }
</style>