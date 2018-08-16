<template>
    <popup :show.sync="showSecond" height="100%" style="overflow-y:scroll;">
        <div class="template">
            <h1><p class="clearfix"><a class="left back" @click="goback()"></a>所属行业</p></h1>
            <ul>
                <li v-for="item in secondIndusrty" track-by="$index">
                    <input  type="radio" value="{{item.name}}" id="{{item.id}}" v-model = 'value' @click=" chooseSecondIndustry(item.name,item.scaleStandard,item.id)">
                    <label for="{{item.id}}" @click="chooseSecondIndustry(item.name,item.scaleStandard,item.id)">{{item.name}}</label>
                </li>
            </ul>
        </div>
    </popup>
</template>
<script>
    import popup from '../uikit/popup/index';
    export default {
        name: 'secondIndusrty',
        data: function() {
            return {
                secondIndusrty: [],
                showSecond: false,
                selectedIndustry: {
                    name: '',
                    scaleStandard: '',
                    id: ''
                },
                firstName: '',
                value: '',
                showFirstIndustry: true
            }
        },
        components: {
            popup
        },
        events: {
            'secondIndustry': function(item) {
                this.secondIndusrty = item.children;
                this.showSecond = item.show;
                this.firstName = item.firstName;             
                this.value = '';
            }
        },
        methods: {
            chooseSecondIndustry(name, scaleStandard, id) {
                this.selectedIndustry.name = name;
                this.selectedIndustry.scaleStandard = scaleStandard;
                this.selectedIndustry.id = id;              
                this.$dispatch('selectedIndustry', this.selectedIndustry);
                this.showSecond = false;
                this.$root.value = name;
                this.value = '';
            },
            goback() {
                this.showSecond = false;
                this.$dispatch('showFirstIndustry', this.showFirstIndustry);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../uikit/weui.0.4.2.min.css';
    @import'../uikit/popup/style.css';
    @import '../assets/variable.less';
    div {
        font-size: 28px;
        background-color: #fff;
        h1 {
            padding: 0 20px;
            height: @top-bar-height;
            line-height: @top-bar-height;
            border-bottom: 2px solid #f1f1f1;
            p {
                text-align: center;
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
                }
                label {
                    display: inline-block;
                    width: 88%;
                    height: 76px;
                }
            }
        }
    }
</style>