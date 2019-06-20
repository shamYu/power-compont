<template>
    <div class="pading5" >
       <div :id="`chart-${this._uid}`" class="chart-wrapp" :style="{'height':`${height}px`}">

       </div>
        <Loading /> 
    </div>
</template>

<script>
import Loading from '_c/loading.vue'
import { Util } from "_lib/util";
import { DateUtil } from "_lib/dateUtil";
import { getAqi24hData } from '_lib/api'
let lineChart = null;
export default {
  data() {
    return {
      cityCode: Util.getUrlParam("cityCode") || 320100,
      cityName:'',
      height: 250,
      serisData: []
    };
  },
  components: {
    Loading
  },
  mounted() {
    lineChart = this.$echarts.init(
      document.getElementById(`chart-${this._uid}`)
    );
    this.getData();
  },
  watch : {
    serisData () {
        this.renderChart()
    }
  },
  methods: {
   async getData() {
       let res = await getAqi24hData(this.cityCode);
       this.cityName = res.result && res.result[0].city || '南京市';
       this.serisData = res.result;
    },
    renderChart() {
      let data = this.serisData;
      let xData = [];
      let yData = [];
      if( data && data.length > 0 ) {
        data.map(item => {
          xData.push(DateUtil.add0(item.date))
          yData.push(item.aqi)
        })
      }
      let option = {
        title: {
            text:`${this.cityName}最近24小时空气质量指数(AQI)趋势`,
            // subtext:'http://www.pm2.5.in',
            textStyle: {
                color:'#fff'
            },
            subtextStyle: {
                color:'#fff'
            },
            // textAlign: 'center',
            left: 'center',
            top: 10
        },
        color: ["#99cc66"],
        tooltip: {
          trigger: "item"
        },
        legend: {
          data: ["AQI"],
          orient: "vertical",
          textStyle: {
            color: "#99cc66"
          },
          right: 0,
          top: 'center'
        },
        // backgroundColor: "#595959",
        xAxis: {
          axisLabel: {
            color: "#fff",
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          type: "category",
          data:xData
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#fff"
          },
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            lineStyle: {
              color: "#656565"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "AQI",
            data:yData,
            type: "line"
          }
        ]
      };
     lineChart.setOption(option);
      lineChart.resize();
    }
  }
};

window.onresize = () => {
   lineChart.resize()
}
</script>

<style lang="less">
    .chart-wrapp{
        background:#595959;
        border-radius: 15px;
    }
</style>
