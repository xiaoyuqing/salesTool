<template>
  <div id="app">
    <div class="consult">
        <h1> 顾问销售是国内首个针对大客户销售流程的销售辅助软件，您可以通过它进行客户的有效分析和需求探寻，并通过现场诊断生成定制化解决方案，请选择您目前所处的销售阶段。</h1>
        <ul>
            <li><p><a href="#/consult">售前分析</a></p></li>
            <li><p><a  class="developing">需求探询</a></p></li>
            <li><p><a  class="developing">量表分析</a></p></li>
            <li><p><a  class="developing">定制方案</a></p></li>
            <li><p><a  class="developing">案例与价值</a></p></li>        
        </ul>
        <p class="feedback"><a v-link="{path:'/feedback'}">意见反馈</a></p>
    </div>
    <router-view></router-view>
  </div> 
</template>

<script>
    import './assets/flexible.js';
    export default {
        data: function() {
            return {
                title: "this is a todolist!",
                items: [],
                newItem: ''
            }
        },
        watch: {
            items: {
                handler: function(val, oldval) {
                    console.log(val, oldval);
                },
                deep: true
            }
        },
        methods: {
            toggleFinish: function(item) {
                item.isFinished = !item.isFinished;
            },
            addNew: function() {
                this.items.push({
                    label: this.newItem,
                    isFinished: false
                })
                this.newItem = '';
            }
        }
    }
</script>

<style lang='less'>
    @import './assets/flexible.css';
    @import './assets/base.css';
    @import './assets/variable.less';
    .consult {
        h1 {
            font-size: 30px;
            padding: 20px;
            color: #000;
        }
        ul {
            margin-top: 100px;
            li {
                margin: 30px 0;
                p {
                    text-align: center;
                    a {
                        display: inline-block;
                        width: 300px;
                        height: 80px;
                        line-height: 80px;
                        text-align: center;
                        background-color: @backorange;
                        border-radius: 20px;
                        color: #fff;
                        font-size: 30px;
                    }
                    a.developing{
                        background-color:#ccc;
                    }
                }
            }
        }
        p.feedback{
            text-align:center;
            margin-top:100px;
            font-size:30px;
            a{
                color:#3487e2;
            }
        }
    }
</style>