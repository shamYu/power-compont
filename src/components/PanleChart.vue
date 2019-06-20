<template>
    <div class="flex">
        <div class="wid5" id="chart">
            
        </div>
        <div class="center">
            <p class="p"><span>空气质量等级：</span><span>{{level}}</span></p>
            <p class="p"><span>首要污染物：</span><span v-html="handlePulltion"></span></p>
        </div>
    </div>
</template>

<script>
import { Util } from '@/lib/util';


//  console.log(this.$echarts)
  var chart = null;
export default {
    name:'PanleChart',
    props: {
        value: {
            type: Number,
            default:250
        },
        cssSeting:{
            type: Object,
            default: () => {
               return {
                   radius: '80%',
                   fontSize:22
               } 
            }
        },
        SYWRW: {
            type: String,
            default: 'PM10'
        }
    },
    mounted(){
         this.renderChart(this.value)
    },
    watch:{
        value(val){
             this.renderChart(val)
        }
    },
    computed: {
        level () {
            return Util.handleAqiLevel(this.value).level;
        },
        handlePulltion () {
            return this.formatSubStr(this.SYWRW)
        }
    },
    methods: {
        formatSubStr(str){
            return str.replace(/\d/g,(val) => {
                return (val+ "").sub()
            })
        },
        renderChart(AQI){
            chart = this.$echarts.init(document.getElementById('chart'))
            let data = {
                value:0,
                color:''
            }
            let realData = Util.handleAqiLevel(AQI);

            Object.assign(data,realData);
            var option = {
                min: 0,
                max: 350,
                // backgroundColor: '#aaa',
                series: [
                    {
                        name: 'AQI',
                        type: 'gauge',
                        radius: this.cssSeting.radius || '80%',
                        startAngle: 245,
                        endAngle: -65,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 12,
                                color: [[data.value/350, data.color], [1, '#eee']],
                            }
                        },
                        splitLine: {show: false},
                        axisTick: {show: false},
                        axisLabel: {show: false},
                        splitLabel: {show: false},
                        pointer: {show: false},
                        itemStyle: {
                            borderWidth: 30,
                            color: '#0f0',
                        },
                        title: {
                            offsetCenter: [0, '70%'],
                            color: data.color,
                            fontSize: this.cssSeting.fontSize || 24
                            // fontWeight: 700
                        },
                        detail: {
                            color: data.color,
                            offsetCenter: [0, '-10%'],
                            fontStyle:{
                                fontSize:20 
                            }
                        },
                        data: [{value: data.value, name: 'AQI'}]
                    }
                ]
            };
            chart.setOption(option,true)
            chart.resize()
        }
    }
}

window.onresize = () => {
    chart.resize()
 }
</script>

<style scoped>
    .flex{
        display: flex;
        width: 100%;
        height:200px; 
        align-items: center;
    }
    .wid5{
        width: 50%;
        height: 100%;
    }
    .center{
         width: 50%;
         display: flex;
         flex-direction: column;
         align-items: center;
    }
    .center > .p {
        width: 100%;
        padding: 5px;
        font-size: 14px;
        text-align: center;
    }
</style>

