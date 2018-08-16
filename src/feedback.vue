<template>
    <div>
        <h1><p class="clearfix"><a class="left back" v-link="{path:'/app'}"></a>意见反馈</p></h1>
        <div class="feedback">
            <form >
                 <textarea type="textarea" class="textarea" placeholder="请输入您遇到的问题或建议" maxlength="400" required v-model="feedback"></textarea>
                 <p class="phone"><label for="">联系方式</label> <input type="number" placeholder="选填，便于我们联系您" v-model="contact"></p>
                 <p class="wrap"><input type="submit" value="提交反馈" class="submit" @click="postfeedback()"></p>
            </form>
        </div>
        <popup :show.sync="success" height="100%">
            
             <h1><p class="clearfix"><a class="left back" v-link="{path:'/app'}"></a>意见反馈</p></h1>
            <div class="success">
                <p class="feedbackSuccess">反馈成功</p>
                <p class="feedbackSuccess">您的反馈我们会认真查看，并尽快修改和完善，感谢您对顾问销售的支持。</p>
            </div>
        </popup>
    </div>
</template>
<script>
    import popup from './uikit/popup/index';
    import jquery from 'jquery';
    export default{
         data:function(){
             return {
                 feedback:'',
                 contact:'',
                 success:false
             }
         },
         components:{
             popup
         },
         methods:{
             postfeedback: function() {
                var url = '/sales-intelligence/web/bs/addFeedback';
                var that = this;
                var data = {
                    'feedback': this.feedback,
                    'contact':this.contact
                };
                if(this.feedback == ''){
                    return;
                };
                jquery.post(url, data, function(data) {
                   that.success = true;
                })
            }
         }
    }

</script>
<style lang="less" scoped>
    @import './assets/variable.less';
    div{ 
        font-size: @size;      
        h1 {
                background-color: #fff;   
                padding: 0 20px;
                height: @top-bar-height;
                line-height: @top-bar-height;
                border-bottom: 2px solid #f1f1f1;
                p {
                    text-align: center;
                }
            }
        .feedback{   
            padding:20px;
            .textarea{
                width:94%;
                height:500px;
                border:none;
                padding:20px;  
                margin-bottom:30px;         
            }
            .phone{
               padding:20px;
               background-color: #fff;  
               input{
                   border:none;
                   width:60%;
                   height: 50px;
                   margin-left:20px;
               }
            }
            p.wrap{
                text-align:center;
                margin-top:200px;
                .submit{
                    border:none;
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
            }           
        }    
    }
    .success{
        padding:20px;
        p{
            text-align:center;
            margin:50px 0;
        }
    }
</style>