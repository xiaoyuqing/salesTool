<template>
   
    <popup :show.sync="show" height="100%">
                <div class="count">
                <h1><p class="clearfix"><a class="left back" @click="show=false"></a>总员工数<span class="right" @click="confirm()">确认</span></p></h1>
                <div>
                    <ul>                       
                        <li v-for="item in options" track-by="$index">
                            <input   type="radio" value="{{item.name}}" v-model="value" id="totalNum_{{$index}}" @click="chooseValue(item.value)" class="radio">
                            <label for="totalNum_{{$index}}" @click="chooseValue(item.value)">{{item.name}}</label>                          
                        </li>
                        <li>
                            <label for="">其他</label>
                        </li>
                        <li><p class="other"><input type="number" class="text" v-model="fillValue" @click="cancleRadio()">人</p></li>
                    </ul>                
                </div>
                </div>             
    </popup> 
    
</template>
<script>
    import popup from '../uikit/popup/index';
    export default {
        name: 'totalNum',
        components: {
            popup
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            head: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                required: true
            }
        },
        data: function() {
            return {
                value: '',
                fillValue: '',
                selectData: {
                    valueNum: '',
                    valueName: ''
                }
            }
        },
        events: {
            'showTotalNum': function(item) {
                this.show = item;
            }
        },
        methods: {
            confirm: function() {
                if (this.fillValue) {
                    this.value = this.fillValue;
                    this.selectData.valueNum = this.fillValue;
                }
                this.selectData.valueName = this.value;               
                this.$dispatch('getTotalNum', this.selectData);             
                this.show = false;
                this.value = '';
                this.fillValue = '';
            },
            chooseValue: function(value) {
                this.fillValue = '';
                this.selectData.valueNum = value;
            },
            cancleRadio() {
                this.value = this.fillValue;
                
                //   this.salesCountValue = this.fillValue.replace(/[^0-9]/g, '');
            }

        }

    }
</script>
<style lang="less">
    @import '../assets/variable.less';
    @import '../uikit/weui.0.4.2.min.css';
    @import'../uikit/popup/style.css';
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
</style>