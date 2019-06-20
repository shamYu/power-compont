<template>
    <div class="pd-header" :style="cssObjProp">
        <div class="pd-hd-item pd-hd-lf">
            <Icon type="ios-pin" size="24" color="white" v-show="isLocated"/>
            {{title}}
        </div>
        <div class="pd-hd-item pd-hd-rt">
            {{date}}
            <DatePicker
        :open="open"
        :value="date"
        confirm
        :transfer="true"
        :type="datetype"
        placement="left"
        @on-change="handleChange"
        @on-clear="handleClear"
        @on-clickoutside="handoutside" 
        @on-ok="handleOk">
        <a href="javascript:void(0)" @click="handleClick">
            <template ><Icon type="ios-calendar-outline" size="20" color="white" /></template>
        </a>
    </DatePicker>
            
        </div>
    </div>
</template>
<script>
import { Util } from '../lib/util'
export default {
    props: {
        cssObjProp:{
            type:Object,
            default: function(){
                return {
                    color: 'white',
                    background: '#21DE83',
                    fontSize:'14px',
                    fontFamily:'Avenir, Helvetica, Arial, sans-serif'
                }
            }
        },
        title:{
            type: String,
            default:'湖南省'
        },
        datetype: {
            type: String,
            default: 'date'
        },
        isLocated: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return { 
            open: false,
            date:this.initData()
        }
    },
    methods: {
        initData() {
            let type = this.datetype;
             if(type === 'year') return Util.getCurrentDate('yyyy')
             if(type === 'month') return Util.getCurrentDate('yyyy-MM')
             if(type === 'date') return Util.getCurrentDate()
              if(type === 'datetime') return Util.getCurrentDate('yyyy-MM-dd HH')
        },
        handleClick () {
                this.open = !this.open;
            },
            handleChange (date) {
                this.date = date;
            },
            handleClear () {
                this.open = false;
            },
            handoutside() {
                this.open = false;
            },
            handleOk () {
                 this.date  =  this.date.substring(0,this.date.indexOf(':'))
                 this.open = false;
                this.$emit("selected",this.date)
            }
    }
}
</script>
<style scoped>
    .pd-header {
        height: 40px;
        width: 100%;
        display: flex;
    }
    .pd-hd-item{
        line-height: 40px;
        width: 50%;
        text-align: center;
    }
    .pd-hd-lf{
        text-align: left;
    }
    .pd-hd-rt{
        text-align: right;
        padding-right: 10px;
    }
    .ivu-date-picker-cells-cell {
        color: #333;
    }
</style>


