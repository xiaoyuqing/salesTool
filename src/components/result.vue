<template>
    <div>
        <popup :show.sync="showResult" height="100%" style="overflow-y:scroll;">
                    <div class="result">
                        <h1>根据客户企业的基本信息，给出以下提示：</h1>
                        <div class="tab">
                            <p class="title">2B业务契合度：<span class="right">{{resultItems.degree2b}}</span></p>
                        </div>
                        <div class="tab" @click="showDetailF('industryFeature')" id="industryFeature">
                            <p class="title">行业常见问题：<span class="right  arrow" ></span></p>                   
                            <div  class ="detail">
                                <h1 class="red" v-if="!(resultItems.industryFeature && resultItems.industryFeature.current)">（暂无该行业数据，以下是上级行业数据）</h1>
                                <span>{{resultItems.industryFeature && resultItems.industryFeature.text}}</span>
                            </div>
                        </div>
                        <div class="tab" @click="showDetailF('marketingProblem')" id="marketingProblem">
                            <p class="title">营销问题：<span class="right  arrow" ></span></p>
                            <p   class ="detail">{{resultItems.marketingProblem}}</p>
                        </div>
                        <div class="tab" @click="showDetailF('saleProblemReason')" id="saleProblemReason">
                            <p class="title">销售管理痛点：<span class="right  rightArrow"></span></p>                    
                            <div  class="tabDetail detail">
                                <h1 class="red" v-if="!(resultItems.industryFeature && resultItems.industryFeature.current)">（暂无该行业数据，以下是上级行业数据）</h1>
                                <span v-text="resultItems.painPoint &&　resultItems.painPoint.text"></span>
                            </div>
                        </div>
                        <div class="tab"  @click="showDetailF('scenario')" id="scenario">
                            <p class="title">应用场景：<span class="right rightArrow"></span></p>
                            <p  class="tabDetail detail" >{{resultItems.scenario}}</p>
                        </div>
                        <div class="tab" @click="showDetailF('dealTarget')" id="dealTarget">
                            <p class="title">成交目标：<span class="right  rightArrow"></span></p>
                            <p  class="tabDetail detail" >{{resultItems.dealTarget}}</p>
                        </div>
                        <div class="tab" @click="showDetailF('activeCompanies')" id="activeCompanies">
                            <p class="title">活跃企业：<span class="right  rightArrow"></span></p>
                            <div class="tabDetail detail"><p  v-for="activeItem in resultItems.activeCompanies">{{activeItem}}</p></div>
                        </div>
                        <div class="tab" @click="getIndustryTemplate()">
                            <p class="title">行业模板：<span class="right  rightArrowIndustry"></span></p>                   
                        </div>                    
                    </div>
                    <div class="foot">
                        <p ><a href="#/app" class="btn" style="margin-left:30px;">返回首页</a><a  class="btn" style="margin-left:30px;" @click="goback()">上一步</a></p>
                    </div>
        </popup>
        <industry-template ></industry-template>
      </div>
</template>
<script >
     import popup from '../uikit/popup/index';
     import industryTemplate from '../components/industryTemplate.vue'
     import jquery from 'jquery';
     export default {
        name:'result',
        data:function(){
           return {                    
              showResult:false,
              industryAth: {
                    industryTemplate: [],
                    show: true
              }
           }
        },
        props:['resultItems'],
        components: {
            popup,
            industryTemplate
        },
        events:{
            'result':function(item){                        
                  this.showResult = item.show;                                 
            },
            'showResult':function(item){
                this.showResult = item;
            }
        },
        ready(){
           
        },
        methods:{
            goback:function(){           
                this.showTemplate = false;
            },
            showDetailF: function(index) {
                $ = jquery;
                if(index == 'industryFeature' || index == 'marketingProblem'){
                    $("#" + index +" .detail").toggle();   
                    $("#" + index +" .arrow").toggleClass("downArrow");   
                    return;
                }
                $("#" + index +" .detail").toggle();   
                $("#" + index +" .rightArrow").toggleClass("arrow");           
            },
            getIndustryTemplate() {
                this.industryAth.industryTemplate = this.resultItems.templates;
                this.$broadcast('industryTemplate', this.industryAth);
            },
            goback(){
                this.showResult = false;
            }
        }
    }
</script>
<style lang="less" scoped>   
    .result {
        font-size: 28px;
        padding: 20px 0;
        h1 {
            padding: 0 20px 20px 20px;
        }
        div.tab {
            background: #fff;
            margin-bottom: 20px;
            padding: 10px 0 20px 0;
            p.title {
                color: #000;
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
            }
        }
        .tabDetail {
            display: none;
           
        }
        .detail{
             padding: 0 20px;
        }
        span.rightArrow {
            background: url('../assets/img/Rectangle 139@2x.png') no-repeat;
            display: block;
            width: 30px;
            height: 30px;
            margin-top: 20px;
            background-size:contain;
        }
        
        span.arrow {
            background: url('../assets/img/2@2x.png') no-repeat;
            background-size:contain;
            display: block;
            width: 30px;
            height: 30px;
            margin-top: 20px;
        }

        span.downArrow{
             background: url('../assets/img/Rectangle 139@2x.png') no-repeat;
             background-size:contain;
        }

        span.rightArrowIndustry{
            background: url('../assets/img/Rectangleright@2x.png') no-repeat;
            display: block;
            width: 30px;
            height: 30px;
            margin-top: 20px;
            background-size:contain;
        }       
    }
    .foot{
        margin-bottom:50px;
    }
</style>