<template>
  <div class="home">
    <power-header :cssObjProp="config.header" @selected="handleSelect" :isLocated="true" :title="headerTitle" />
    <main >
      <div class="main-top">
        <div class="pd-select">
          <Button :type="btnType1" @click="changeType('s')" style="margin-right:2px;">城市</Button>
          <Button :type="btnType2"  @click="changeType('z')">站点</Button>
        </div>
        <div class="pd-select">
            <label class="pd-label">{{label}}:</label>
            <Dropdown style="margin-left: 5px" @on-click="handleLocalClick">
                <Button>
                    {{cityValue}}
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                      <DropdownItem v-if="params.tp === 's'" :name="index" v-for="(item,index) in cityList" :key="index">{{item.city}}</DropdownItem>
                       <DropdownItem v-if="params.tp === 'z'" :name="index" v-for="(item,index) in cityList" :key="index">{{item.station}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown style="margin-left: 5px" @on-click="handleValType">
                <Button>
                    {{hourValue}}
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                    <DropdownMenu slot="list" >
                      <DropdownItem  :name="index" v-for="(item,index) in hourList" :key="index">{{item.name}}</DropdownItem>
                    </DropdownMenu>
            </Dropdown>
        </div>
      </div>
      <panle-chart :value="rep.AQI" :SYWRW="rep.SYWRW"></panle-chart>
      <p class="dashed-line"></p>
      <div class="flex">
          <div class="air-item data-renwu-mss">
              <p class="item_1 air_c">
                <span>{{rep.PM25}}</span><em>μg/m³</em>
              </p>
               <div><span :style="{'width':rep.PM25/maxLen + '%','backgroundColor': $options.filters.filterColor(rep.PM25)}"></span></div>
              <p class="item_1">PM2.5</p>
          </div>
          <div class="air-item data-renwu-mss">
              <p class="item_1 air_c">
                <span>{{rep.PM10}}</span><em>μg/m³</em>
              </p>
              <div><span :style="{'width':rep.PM10/maxLen + '%','backgroundColor': $options.filters.filterColor(rep.PM10)}"></span></div>
              <p class="item_1">PM10</p>
          </div>
          <div class="air-item data-renwu-mss">
              <p class="item_1 air_c">
                <span>{{rep.SO2}}</span><em>μg/m³</em>
              </p>
              <div><span :style="{'width':rep.SO2/maxLen + '%','backgroundColor': $options.filters.filterColor(rep.SO2)}"></span></div>
              <p class="item_1">SO2</p>
          </div>
        </div>
        <div class="flex">
          <div class="air-item data-renwu-mss">
              <p class="item_1 air_c">
                <span>{{rep.NO2}}</span><em>μg/m³</em>
              </p>
              <div><span :style="{'width':rep.NO2/maxLen + '%','backgroundColor': $options.filters.filterColor(rep.NO2)}"></span></div>
              <p class="item_1">NO2</p>
          </div>

          <div class="air-item data-renwu-mss">
              <p class="item_1 air_c">
                <span>{{rep.O3}}</span><em>μg/m³</em>
              </p>
                <div><span :style="{'width':rep.O3/maxLen + '%','backgroundColor': $options.filters.filterColor(rep.O3)}"></span></div>
              <p class="item_1">O3</p>
          </div>

          <div class="air-item data-renwu-mss">
              <p class="item_1 air_c">
                <span>{{rep.CO}}</span><em>mg/m³</em>
              </p>
              <div><span :style="{'width':rep.CO/maxLen + '%','backgroundColor': $options.filters.filterColor(rep.CO)}"></span></div>
              <p class="item_1">CO</p>
          </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import PowerHeader from "_c/PowerHeader.vue"
import PanleChart from '_c/PanleChart.vue'

import { getcityByXzqh, getPointerByCityCode ,getcityHourAqi,getcityDayAqi ,
          getPointHourByCode, getPonintDayByCode,gettodayCumulative,
          getTodayPointerCumulative, geConfigSetting
        } from '@/lib/api'

import { Util } from '_lib/util'

export default {
  name: "home",
  components: {
    PowerHeader,
    PanleChart
  },
  data(){
    return{
      XZQHDM:Util.getUrlParam('XZQHDM') || 430000,
      headerTitle:'',
      cityValue_cache:'',
      cityValue:'',
      cityCode:'',
      stationCode:'',
      hourValue:'小时值',
      cityList:[],
      hourList:[
                {name:'小时值',value:'h'},
                {name:'日均值',value:'d'},
                {name:'当日累计',value:'dd'},
            ],
      btnType1:"success",
      btnType2:"default",
      label:'城市' ,   //切换城市和站点 s/z
      params:{
        tp:'s',  
        timetype:'h' // h、d、dd
      },
      rep: {
        AQI: 0,
        SYWRW: '',
        PM25: 0,
        PM10: 0,
        SO2: 0,
        NO2: 0,
        O3: 0,
        CO: 0
      },
      maxLen:5,
      cache:{},
      config:{} 
    }
   
  },
  created(){
      this.geConfigSetting();//获取样式配置
     this.getcityList() //初始化的时候获取城市列表
  },
  filters: {
    filterColor(val){
      return Util.handleAqiLevel(val) && Util.handleAqiLevel(val).color;
    }
  },
  methods: {
    async geConfigSetting() {
      let config = await geConfigSetting();
      if(config.result) Object.assign(this.config,config.result)
      console.log(this.config)
    },
    handleSelect(val) {
      console.log(val);
    },
    //城市列表
    async getcityList(){
      let res =  await getcityByXzqh(this.XZQHDM);
      if(res.code === 0 && res.result.length > 0){
          this.cityList = res.result;
          this.headerTitle =  res.result[0].province + '空气质量实况';
          this.cityValue = this.cityValue_cache ? this.cityValue_cache :res.result[0].city;
          this.cityCode = this.cityCode ? this.cityCode : res.result[0].cityCode;
          this.renderData() 
      } 
    },
    //站点列表
    async getpointerList(){
      let res =  await getPointerByCityCode(this.cityCode);
      if(res.code === 0){
        this.cityList = res.result;
        this.cityValue = res.result[0].station;
        this.stationCode = res.result[0].stationCode;
         this.renderData() 
      } 
    },
    //获取城市小时值
    async getcityHourAqi() {
      let res = await getcityHourAqi(this.cityCode)
      if(res.code === 0){
         let result = res.result;
         let OBJ = {
            AQI: result.aqi,
            SYWRW: result.pollutions,
            PM25: result.pm2_5,
            PM10: result.pm10,
            SO2: result.so2,
            NO2: result.no2,
            O3: result.o3,
            CO: result.co
         }
         Object.assign(this.rep,OBJ)
      }
    },
    //城市日均值数据
    async getcityDayAqi() {
      let res = await getcityDayAqi(this.cityCode)
      if( res.code === 0 ){
        let result = res.result;
         let OBJ = {
            AQI: result.aqi,
            SYWRW: result.pollutions,
            PM25: result.pm2_5_24h,
            PM10: result.pm10_24h,
            SO2: result.so2_24h,
            NO2: result.no2_24h,
            O3: result.o3_8h_24h,
            CO: result.co_24h
         }
         Object.assign(this.rep,OBJ)
      }
    },
    //站点小时值
    async getPointHourByCode() {
      let res = await getPointHourByCode(this.stationCode);
      if(res.code === 0){
        let result = res.result;
        let OBJ = {
            AQI: result.aqi,
            SYWRW: result.pollutions,
            PM25: result.pm2_5,
            PM10: result.pm10,
            SO2: result.so2,
            NO2: result.no2,
            O3: result.o3,
            CO: result.co
         }
         Object.assign(this.rep,OBJ)
      }
    },
    //站点日均值
    async getPonintDayByCode() {
      let res = await getPonintDayByCode(this.stationCode)
      if(res.code === 0) {
        let result = res.result;
        let OBJ = {
            AQI: result.aqi,
            SYWRW: result.pollutions,
            PM25: result.pm2_5_24h,
            PM10: result.pm10_24h,
            SO2: result.so2_24h,
            NO2: result.no2_24h,
            O3: result.o3_8h_24h,
            CO: result.co_24h
         }
         Object.assign(this.rep,OBJ)
      }
    },
    //切换城市和站点
    changeType(tp){
      if(tp === this.params.tp){
         return
      }
      let obj = {
        tp: tp
      }
      Object.assign(this.params,obj)
      if(tp === 's'){
          this.btnType1 = 'success';
          this.btnType2 = 'default'
          this.label = '城市'
          this.getcityList()
      }else{
         this.btnType2 = 'success'
         this.btnType1= 'default'
         this.label = '站点'
         this.getpointerList()
      } 
      // this.renderData()
    },
    //切换小时值/日均值/当日累计
    handleValType(index){
        let item = this.hourList[index];  
        let  obj = { timetype: item.value }
        Object.assign(this.params,obj)
        this.hourValue = item.name
        this.renderData()
    },
    //选择地区或站点的下拉框
    handleLocalClick(index) {
      let item = this.cityList[index];
      if(this.params.tp === 's'){
        this.cityCode = item.cityCode
        this.cityValue = item.city;
        this.cityValue_cache = item.city; // 缓存城市名称
      }else{
        this.stationCode = item.stationCode;
        this.cityValue = item.station;
      }
       this.renderData()
    },
    renderData(){
       let tp = this.params.tp;
       let timetype = this.params.timetype;
        if( timetype === 'h' && this.params.tp === 's') this.getcityHourAqi()  //小时值(城市)
        if( timetype === 'd' && this.params.tp === 's') this.getcityDayAqi()   // 日均值(城市)
        if( timetype === 'dd' && this.params.tp === 's') this.gettodayCumulative()   // 当日累计(城市)
        if( timetype === 'h' && this.params.tp === 'z') this.getPointHourByCode()  //小时值(城市)
        if( timetype === 'd' && this.params.tp === 'z') this.getPonintDayByCode()   // 日均值(城市)
        if( timetype === 'dd' && this.params.tp === 'z') this.getTodayPointerCumulative()   // 当日累计(城市)
    },
    async gettodayCumulative(){
      let res = await gettodayCumulative(this.cityCode);
      if(res.code === 0){
        let result = res.result;
        let OBJ = {
            AQI: result.aqi,
            SYWRW: result.pollutions,
            PM25: result.pm2_5,
            PM10: result.pm10,
            SO2: result.so2,
            NO2: result.no2,
            O3: result.o3,
            CO: result.co
         }
         Object.assign(this.rep,OBJ)
      }
    },
    async getTodayPointerCumulative(){
      let res = await getTodayPointerCumulative(this.stationCode);
      if(res.code === 0){
        let result = res.result;
        let OBJ = {
            AQI: result.aqi,
            SYWRW: result.pollutions,
            PM25: result.pm2_5,
            PM10: result.pm10,
            SO2: result.so2,
            NO2: result.no2,
            O3: result.o3,
            CO: result.co
         }
         Object.assign(this.rep,OBJ)
      }
    }
  }
};
</script>
<style scoped>
  .main-top{
    display: flex;
    padding: 5px;
  }
  .pd-select:first{
    width: 30%;
  }
  .pd-label{
    padding: 0 5px;
  }
  .dashed-line{
    width: 100%;
    border-bottom: 1px dashed #ccc
  }
  .flex{
    display: flex;
    padding: 15px;
  }
  .flex > .air-item{
    width:33.33%;
  }
  .flex > .air-item > .air_c{
    width: 60%;
    /* padding-bottom: 5px;
    border-bottom: 3px solid #25bf61; */
    margin: 2px auto;
  }
  .flex > .air-item > .air_c > span {
    font-size: 14px;
    padding: 5px;
  }
  .flex > .air-item > .air_c > em {
    color: #a09898;
  }
  .item_1{
    text-align: center;
  }
  .data-renwu-mss div{
    position: relative;
    height: 5px;
    border-radius: 6px;
    background-color: #ebebeb;
    width: 60%;
    margin-top: 5px;
    margin: 0 auto;
}
.data-renwu-mss div span{
    position: absolute;
    height:100%;
    top: 0;
    left: 0;
    width: 35%;
    border-radius: 6px;
    /* background-color: #0cbced; */
}
</style>

