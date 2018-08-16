<template>
    <div class="tabContainer">
       <div class="clearfix">
           <ul class="tab">
               <li v-for="item in items" class="left" v-bind:class="{active:item.heading == currTab}"><a v-bind:href="[item.route]">{{item.heading}}</a></li>
           </ul>
       </div>
    </div>
</template>
<script>
    export default {
        name: 'navfilter',
        data: function() {
            return {
                items: [{
                    heading: "售前",
                    route: '#/consult'
                }, {
                    heading: "SPIN",
                    route: '#/consult'
                }, {
                    heading: "量表",
                    route: '#/consult'
                }, {
                    heading: "方案",
                    route: '#/consult'
                }, {
                    heading: "价值",
                    route: '#/consult'
                }],
                currTab: "售前"
            }
        },
        watch: {
            items: {
                // handler: function(val, oldval) {
                //     console.log(val, oldval);
                // },
                // deep: true
            }
        },
        methods: {
            changeTab(tab){
                this.currTab = tab;               
            }
        }
    }
</script>
<style lang="less">
    @import '../assets/variable.less';
    .tabContainer {
        background-color: #fff;
        ul.tab {
            width: 100%;
            height: 80px;
            line-height: 80px;
            li {
                font-size: 28px;
                text-align: center;
                width: 20%;
                a {
                    color: #aaa;
                }
            }
            li.active {
                a {
                    color: #f59425;
                }
                border-bottom: 2px solid #f59425;/*no*/
            }
        }
    }
</style>