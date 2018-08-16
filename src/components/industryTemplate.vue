<template>
    <popup :show.sync="showTemplate" height="100%" style="overflow-y:scroll;-webkit-overflow-scrolling:touch;" >
        <div class="template">
          <h1><p class="clearfix"><span @click="goback()"><a class="back left"></a></span>行业模板</p></h1>
          <table class="templateTable">
              <tr v-for="item in template">
                  <td v-text="item.k" class="tdleft"></td>
                  <td v-text="item.v" class="tdright"></td>
              </tr>
          </table>
        </div>
    </popup>
</template>
<script>
    import popup from '../uikit/popup/index';   
    export default {
        name:'industryTemplate',
        data:function(){
           return {
              template:[],
              showTemplate:false                        
           }
        },
        components: {
            popup
        },      
        // props:["show"],  
        // ready(){
        //     this.showTemplate = this.show;
        // },
        events:{
            'industryTemplate':function(item){
                  this.template = item.industryTemplate;
                  this.showTemplate = item.show;                 
            }
        },
        methods:{
            goback(){           
                this.showTemplate = false;                                    
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../uikit/weui.0.4.2.min.css';
    @import'../uikit/popup/style.css';
    @import '../assets/variable.less';
    .template{
        font-size: 28px;
        h1{
            padding:0 20px;
            background:#fff;
            font-size:30px;
            height:@top-bar-height;
            line-height:@top-bar-height;
            p{
                text-align:center;
            }
        }
        table.templateTable{
            border-bottom:1px solid #ccc;
            td{
                text-align:center;
                min-height:200px;
                border-top:1px solid #ccc;
                padding:20px;
                
            }
            td.tdleft{
               width:40%;
               border-right:1px solid #ccc;
            }
            
        }
    }
</style>