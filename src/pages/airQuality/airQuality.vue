<template>
  <div class="home">
    <power-header datetype="datetime" :cssObjProp="config.header" @selected="handleSelect" :isLocated="true" :title="headerTitle" />
    <main >
      <panle-chart :value="rep.AQI" :cssSeting="config.ringChart" :SYWRW="rep.SYWRW"></panle-chart>
      <p class="dashed-line"></p>
      <div class="flex">
          <pd-pulltion :value="rep.PM25" label="PM2.5" :compareValue="75"></pd-pulltion>
          <pd-pulltion :value="rep.PM10" label="PM10" :compareValue="150"></pd-pulltion>
          <pd-pulltion :value="rep.SO2" label="SO2" :compareValue="500"></pd-pulltion>
          <pd-pulltion :value="rep.NO2" label="NO2" :compareValue="200"></pd-pulltion>
          <pd-pulltion :value="rep.O3" label="O3" :compareValue="200"></pd-pulltion>
          <pd-pulltion :value="rep.CO" label="CO" :compareValue="10" unit="mg/m³"></pd-pulltion>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import PowerHeader from "_c/PowerHeader.vue";
import PanleChart from "_c/PanleChart.vue";

import { geConfigSetting, getCityAqiByHour } from "@/lib/api";

import { Util } from "_lib/util";
import { DateUtil } from "_lib/dateUtil";
import pdPulltion from "_c/pd-pulltion.vue";
export default {
  name: "home",
  components: {
    PowerHeader,
    PanleChart,
    pdPulltion
  },
  data() {
    return {
      cityCode: Util.getUrlParam("cityCode") || 320100,
      headerTitle: "",
      rep: {
        AQI: 0,
        SYWRW: "",
        PM25: 0,
        PM10: 0,
        SO2: 0,
        NO2: 0,
        O3: 0,
        CO: 0
      },
      maxLen: 5, //污染物的横线长度根据IAQI计算，最高值500
      config: {},
      dateParams: {
        beginTime:
          new Date().getFullYear() +
          "-" +
          DateUtil.add0(new Date().getMonth()) +
          "-01 00:00:00",
        endTime: Util.getCurrentDate("yyyy-MM-dd HH:mm:ss")
      }
    };
  },
  created() {
    this.geConfigSetting(); //获取样式配置
    this.getCityAqiByHour();
  },
  filters: {
    filterColor(val, compare) {
      return Util.handleAqiLevel(val) && Util.handleAqiLevel(val).color;
    }
  },
  methods: {
    async geConfigSetting() {
      let config = await geConfigSetting();
      if (config.result) Object.assign(this.config, config.result);
    },
    handleSelect(val) {
      let param = {
        endTime: val + ":00:00"
      };
      Object.assign(this.dateParams, param);
      this.getCityAqiByHour();
    },
    //获取城市小时 段值
    async getCityAqiByHour() {
      let res = await getCityAqiByHour(this.cityCode, this.dateParams);
      if (res.code === 0) {
        let result = res.result && res.result.list[0];
        let OBJ = {
          AQI: result.aqi,
          SYWRW: result.pollutions,
          PM25: result.pm2_5,
          PM10: result.pm10,
          SO2: result.so2,
          NO2: result.no2,
          O3: result.o3,
          CO: result.co
        };
        Object.assign(this.rep, OBJ);
        this.headerTitle = result.city + "空气质量小时数据";
      }
    }
  }
};
</script>
<style scoped>
.main-top {
  display: flex;
  padding: 5px;
}
.pd-select:first {
  width: 30%;
}
.pd-label {
  padding: 0 5px;
}
.dashed-line {
  width: 100%;
  border-bottom: 1px dashed #ccc;
}
</style>

