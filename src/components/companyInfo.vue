<template>
    <div class="basicInfo">
        <ul>
            <li class="companyName"><label for="name"><span class="red">*</span>企业名称</label><input type="text" placeholder="请输入名称" v-model="companyName"></li>
            <li><label for="phone" style="padding-left:20px;">联系方式</label><input type="text" placeholder="请输入联系方式" v-model="phone"></li>            
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'companyInfo',
        data: function() {
            return {
                companyInfo: {
                    companyName: '',
                    phone: ''
                }
            }
        }
    }
</script>
<style>
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
                    width: 530px;
                    border: none;
                    height: 73px;
                    line-height: 73px;
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
</style>