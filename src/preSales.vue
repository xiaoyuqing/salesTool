<template>
    <div>
        <div class="presales">
            <div class="basicInfo">
            <h1>请输入拜访客户企业的基本信息，提交后得出销售提示。</h1>
            <ul>
                <li class="companyName"><label for="name"><span class="red">*</span>企业名称</label><input type="text" placeholder="请输入名称" v-model="companyName"   @focus="change()"></li>
                <li><label for="phone" style="">联系方式</label><input type="number" placeholder="请输入联系方式" v-model="phone"></li>            
            </ul>
            <p></p>
            </div>
            <div class="choose">
                <table>
                    <tr class="clearfix industry"  @click="selectIndustry()" >
                        <td class="td_left">
                            <span class="red">*</span>
                            <label>所属行业</label>
                       </td>
                       <td class="td_right"><span class="right selected">{{industry}}<label v-show="industry == ''">请选择</label><i class="rightArrow"></i></span> </td>                          
                    </tr>               
                    <tr class="clearfix salesCount"  @click="selectSalesCount()">
                        <td class="td_left"> <span class="red">*</span><label>去年年营业额</label></td>
                        <td  class="td_right"><span class="right selected">{{salesCount}}<label v-show="salesCount == ''">请选择</label><i class="rightArrow"></i>
                        </span>
                        </td>                  
                    </tr>     
                    <tr style="color:red;padding-left:20px;background:#f1f1f1;display:none;" class="tip1"><td colspan="2">请先选择行业</td></tr>       
                    <tr class="clearfix staffNum" @click="selectStaffNum()">
                        <td class="td_left">
                            <span class="red">*</span>
                            <label>总员工数</label>
                        </td>
                        <td  class="td_right"><span  class="right selected" >{{staffNum}}<label v-show="staffNum == ''">请选择</label><i class="rightArrow"></i></span></td>                                 
                    </tr>    
                    <tr style="color:red;padding-left:20px;background:#f1f1f1;display:none;" class="tip2"><td colspan="2">请先选择行业</td></tr>        
                    <tr class="clearfix salesNum" @click="showSalesNum=true">
                        <td class="td_left"><span class="red">*</span><label>销售员工数</label></td>
                        <td  class="td_right"><span  class="right selected">{{salesNum}}<label v-show="salesNum == ''">请选择</label><i class="rightArrow"></i></span></td>                 
                    </tr>            
                    <tr class="clearfix boss" @click="selectBoss()">
                        <td class="td_left">
                            <span class="red">*</span>
                            <label>老板性格</label>
                        </td>
                        <td  class="td_right"><span class="right selected">{{boss}}<label v-show="boss == ''">请选择</label><i class="rightArrow"></i></span></td>                 
                    </tr>            
                </table>
            <p style="color:red;padding:10px 0 0 10px;" class="tip">*为必填项，请填写！</p>         
            <p class="submit"><a @click="getResultData()">提交</a></p>
            </div>
        </div>
            <popup :show.sync="showIndustry" height="100%" style="overflow-y:scroll;-webkit-overflow-scrolling:touch;">
                <div class="count">
                    <h1><p class="clearfix"><a class="left back" @click="showIndustry=false"></a>所属行业</p></h1>
                    <div class="chooseIndustry">
                        <ul>
                            <li class="clearfix" v-for = "item in industryItems" track-by="$index" @click="chooseCategory(item.name,$index,item.children)"><span >{{item.name}}</span><span class="right"><i class="rightArrow"></i></span></li>
                        </ul>
                    </div>
                </div>
            </popup>
            <second-industry ></second-industry>
            <sales-num   :options="radioItems" ></sales-num>   
            <total-num   :options="radioItems" ></total-num>                                                 
            <popup :show.sync="showSalesNum" height="100%">
                <div class="count">
                <h1><p class="clearfix"><a class="left back" @click="showSalesNum=false"></a>销售员工数</p></h1>
                <div>
                    <ul>
                        <li v-for="item in salesNumItems" track-by="$index">
                            <input  name="salesNum" type="radio" value="{{item}}" id="salesNum{{$index}}" @click="chooseSalesNum(item)">
                            <label for="salesNum{{$index}}" @click="chooseSalesNum(item)">{{item}}</label>
                        </li>
                    </ul>
                </div>
                </div>
            </popup>     
            <popup :show.sync="showBoss" height="100%" style="overflow-y:scroll;-webkit-overflow-scrolling:touch;">
                <div class="count">
                <h1><p class="clearfix"><a class="left back" @click="showBoss=false"></a>老板性格</p></h1>
                <div class="boss">
                    <ul v-for="item in bossItems" track-by="$index">
                        <li>
                            <input  name="boss" type="radio" value="{{item.name}}" id="boss{{$index}}" v-model="boss" @click=" chooseBoss(item.id)">
                            <label for="boss{{$index}}" @click="chooseBoss(item.id)">{{item.name}}</label>  
                            <span   @click="showDetailF($index)" class="spread right"></span>                        
                        </li>
                        <div class="personality" id="{{$index}}" style="display:none;">                          
                            <p>常见表现</p>
                            <p>{{item.behavior}}</p>     
                            <p>心理分析</p>  
                            <p>{{item.psychoanalysis}}</p>                
                        </div>
                    </ul>
                </div>
                </div>
            </popup>      
            <popup :show.sync="showError" height="50%">
                <p style="text-align:center;margin-top:30%;">{{errorMsg}}</p> 
            </popup>               
            <result  v-bind:result-items="resultItems.dataItems"></result>
    </div>  
</template>
<script>
    import jquery from 'jquery';
    import popup from './uikit/popup/index';
    import salesNum from './components/salesNum'
    import totalNum from './components/totalNum'
    import secondIndustry from './components/secondIndustry.vue'
    import result from './components/result'
    import './assets/jsApi.js'
    export default {
        components: {
            popup,
            secondIndustry,
            result,
            salesNum,
            totalNum
        },
        name: 'preSales',
        data: function() {
            return {
                industryItems: [],
                salesCountItems: [],
                staffNumItems: [],
                salesNumItems: ["10以下", "10-20人", "20-50人", "50-100人", "100人以上"],
                bossItems: [],
                resultItems: {
                    dataItems: {},
                    show: true
                },
                showIndustry: false,
                showSalesCount: false,
                showStaffNum: false,
                showSalesNum: false,
                showBoss: false,
                showResult: false,
                showError: false,
                errorMsg: '',
                industry: '',
                scaleStandard: '',
                salesCount: '',
                staffNum: '',
                salesNum: '',
                boss: '',
                showDetail: false,
                salesCountValue: '',
                inputSalesCount: '',
                staffNumValue: '',
                inputStaffNum: '',
                bossId: '',
                companyName: '',
                phone: '',
                secondIndustryItem: {
                    children: [],
                    firstName: '',
                    show: true
                },
                categoryId: '',
                head: '',
                radioItems: []
            };
        },
        ready() {
              
        },
        events: {
            'selectedIndustry': function(item) {
                this.industry = item.name;
                this.scaleStandard = item.scaleStandard;
                this.categoryId = item.id;
                $(".industry").removeClass('notNull');
            },
            'getSalesNum': function(item) {
                this.salesCount = item.valueName;
                this.salesCountValue = item.valueNum;
                 $(".salesCount").removeClass('notNull');
            },
            'getTotalNum': function(item) {
                this.staffNum = item.valueName;
                this.staffNumValue = item.valueNum;
                 $(".staffNum").removeClass('notNull');
            },
            'showFirstIndustry': function(item) {
                this.showIndustry = item;
            }
        },
        watch: {
            industry: {
                handle: function(val, oldValue) {
                    if (oldValue == '') {
                        $(".industry").removeClass('notNull');
                    }
                },
                deep: true
            },
            'companyName':{
                handle: function(val, oldValue) {
                    console.log(val);
                    if (val != '') {
                       $(".companyName").removeClass('notNull');
                    }
                },
                deep: true
            }
        },
        methods: {
            selectIndustry: function() {
                this.getIndustryData();
                this.showIndustry = true;
            },
            selectSalesCount: function() {
                if (this.industry == '') {
                    $(".tip1").fadeIn("slow", "linear").delay(4000).fadeOut("slow");
                    return;
                }
                var url = '/sales-intelligence/web/bs/choice';
                var that = this;
                var data = {
                    'scaleId': this.scaleStandard
                };
                jquery.post(url, data, function(data) {
                    that.salesCountItems = data.data.revenueChoice;
                    that.staffNumItems = data.data.staffChoice;
                    that.head = "去年年营业额";
                    that.radioItems = that.salesCountItems;
                    that.showSalesCount = true;
                    that.$broadcast('showSalesNum', that.showSalesCount);
                })
            },
            selectStaffNum: function() {
                if (this.industry == '请选择') {
                    $(".tip2").fadeIn("slow", "linear").delay(4000).fadeOut("slow");
                    return;
                }
                var url = '/sales-intelligence/web/bs/choice';
                var that = this;
                var data = {
                    'scaleId': this.scaleStandard
                };
                jquery.post(url, data, function(data) {
                    that.salesCountItems = data.data.revenueChoice;
                    that.staffNumItems = data.data.staffChoice;
                    that.showStaffNum = true;
                    that.head = "总员工数";
                    that.radioItems = that.staffNumItems;
                    that.$broadcast('showTotalNum', that.showStaffNum);
                })
            },
            selectSalesNum: function() {
                this.showSalesNum = true;
            },
            selectBoss: function() {
                this.getBossPersonality();
                this.showBoss = true;
            },
            chooseCategory: function(name, index, children) {
                this.showIndustry = false;
                this.scaleStandard = this.industryItems[index].scaleStandard;
                this.secondIndustryItem.firstName = name;
                if (children) {
                    this.secondIndustryItem.children = children;
                    this.$broadcast('secondIndustry', this.secondIndustryItem);
                }
                this.salesCount = '';
                this.staffNum = '';
            },
            chooseSalesNum: function(item) {
                this.salesNum = item;
                this.showSalesNum = false;
                 $(".salesNum").removeClass('notNull');
            },
            chooseBoss(id) {
                this.bossId = id;
                this.showBoss = false;
                 $(".boss").removeClass('notNull');
            },
            getIndustryData: function() {
                if (window.develop) {
                    var url = '/sales-intelligence/web/bs/categories?test=true';
                } else {
                    var url = '/sales-intelligence/web/bs/categories';
                }
                var that = this;
                var dataUrl = {};
                jquery.post(url, dataUrl, function(data) {
                    that.industryItems = data.data;
                })
            },
            getCategoryData: function() {
                var url = '/sales-intelligence/web/bs/choice';
                var that = this;
                var data = {
                    'scaleId': this.scaleStandard
                };
                jquery.post(url, data, function(data) {
                    that.salesCountItems = data.data.revenueChoice;
                    that.staffNumItems = data.data.staffChoice;
                })
            },
            getBossPersonality: function() {
                var url = '/sales-intelligence/web/bs/personality';
                var that = this;
                var data = {};
                jquery.post(url, data, function(data) {
                    that.bossItems = data.data;
                })
            },
            showDetailF: function(index) {
                $ = jquery;
                $("#" + index).toggle();
                $(".boss ul li:eq(" + index + ") span").toggleClass("arrow");
            },
            getResultData() {
                var url = '/sales-intelligence/web/bs/tips';
                var that = this;
                if (window.develop) {
                    var data = {
                        'companyName': 659934,
                        'phone': '',
                        'categoryId': 7,
                        'revenue': 30001,
                        'employee': 19,
                        'saleStaffNum': '100人以上',
                        'bossCharacter': 4

                    };
                } else {
                    var data = {
                        'companyName': this.companyName,
                        'phone': this.phone,
                        'categoryId': this.categoryId,
                        'revenue': this.salesCountValue,
                        'employee': this.staffNumValue,
                        'saleStaffNum': this.salesNum,
                        'bossCharacter': this.bossId
                    };
                }
                //没选的出现一个红框      
                if (!window.develop) {
                    if (this.industry == '') {
                        $(".industry").addClass('notNull');
                    }
                    if (this.salesCount == '') {
                        $(".salesCount").addClass('notNull');
                    }
                    if (this.staffNum == '') {
                        $(".staffNum").addClass('notNull');
                    }
                    if (this.salesNum == '') {
                        $(".salesNum").addClass('notNull');
                    }
                    if (this.boss == '') {
                        $(".boss").addClass('notNull');
                    }
                    if (this.companyName == '') {
                        $(".companyName").addClass('notNull');
                    }
                    if (this.companyName == '' || this.industry == '' || this.salesCount == '' || this.staffNum == '' || this.salesNum == '' || this.boss == '') {
                        return;
                    }
                }
                jquery.post(url, data, function(data) {
                    if (data.errCode != 0) { //出错的时候提示
                        that.showError = true;
                        that.errorMsg = data.errMsg;
                        return;
                    } else {
                        that.resultItems.dataItems = data.data;
                        that.showResult = true;
                        that.$broadcast('result', that.resultItems);
                    }
                })
            },
            change(){
                 $(".companyName").removeClass('notNull');
            }
        }
    }
</script>
<style lang="less">
    @import './assets/variable.less';
    @import './uikit/weui.0.4.2.min.css';
    @import'./uikit/popup/style.css';
    .presales {
        font-size: 28px;
        background-color: @backcolor;
        .basicInfo {
            height: 100%;
            h1 {
                padding: 20px;
                color: #000;
            }
            ul {
                background-color: #fff;
                li {
                    padding-left: 20px;
                    height: 80px;
                    line-height: 80px;
                    border-bottom: 2px solid #f1f1f1;
                    /*no*/
                    input {
                        margin-left: 20px;
                        width: 65%;
                        border: none;
                        height: 73px;
                        line-height: 73px;
                    }
                    label {
                        width: 140px;
                        display: inline-block;
                        text-align: right;
                    }
                }
                li.notNull {
                    border: 1px solid red;
                    /*no*/
                    border-radius: 5px;
                }
            }
            p {
                padding-right: 20px;
                text-align: right;
                height: 80px;
                line-height: 80px;
            }
        }
        .choose {
            table {
                background-color: #fff;
                width: 100%;
                td {
                    padding: 20px 10px 20px 20px;
                    border-bottom: 1px solid #f1f1f1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                td.td_left {
                    width: 35%;
                    min-width: 35%;
                }
                td.td_right {
                    width: 64%;
                    min-width: 64%;
                    span {
                        display: block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    color:#888;
                }
                tr.notNull {
                    border: 2px solid red;/*no*/
                }
            }
        }
    }
    
    .count {
        font-size: 28px;
        background-color: #fff;
        h1 {
            padding: 0 20px;
            height: @top-bar-height;
            line-height: @top-bar-height;
            p {
                text-align: center;
                border-bottom: 1px solid #f1f1f1;
                /*no*/
            }
        }
        ul {
            li {
                padding: 0 20px;
                height: 80px;
                line-height: 80px;
                border-bottom: 1px solid #f1f1f1;
                /*no*/
                input {
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                }
                label {
                    display: inline-block;
                    width: 500px;
                    height: 76px;
                }
                input.text {
                    width: 500px;
                    height: 70px;
                    border: none;
                }
            }
        }
    }
    
    p.submit {
        text-align: center;
        margin: 120px 0;
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
    }
    
    a.btn {
        display: inline-block;
        padding: 10px 30px;
        text-align: center;
        background-color: @backorange;
        border-radius: 20px;
        color: #fff;
        font-size: 30px;
    }
    
    a.back {
        background: url('./assets/img/Triangle Copy 6@2x.png') no-repeat 0 0;
        [data-dpr="3"]& {
            background-image: url('./assets/img/Triangle Copy 6@3x.png');
        }
        width: 22px;
        height: 38px;
        display: inline-block;
        margin:30px 0;
        background-size: contain;
    }
    
    div.personality {
        padding: 20px;
        background-color: #f2f2f2;
    }
    
    .red {
        color: red;
        margin-right: 10px;
    }
    
    p.other {
        border: 1px solid #ccc;
        /*no*/
        border-radius: 10px;
        width: 75%;
        margin-left: 30px;
    }
    
    span.spread {
        background: url('./assets/img/Rectangle 139@2x.png') no-repeat;
        [data-dpr="3"]& {
            background-image: url('./assets/img/Rectangle 139@3x.png');
        }
        display: block;
        width: 45px;
        height: 20px;
        margin-top: 30px;
        background-size: contain;
    }
    
    span.arrow {
        background: url('./assets/img/2@2x.png') no-repeat;
        [data-dpr="3"]& {
            background-image: url('./assets/img/2@3x.png');
        }
    }
    
    i.rightArrow {
        width: 14px;
        height: 24px;
        display: inline-block;
        margin-left: 20px;
        background: url('./assets/img/Rectangleright@2x.png') no-repeat;
        [data-dpr="3"]& {
            background-image: url('./assets/img/Rectangleright@3x.png');
        }
        background-size: contain;
    }
</style>