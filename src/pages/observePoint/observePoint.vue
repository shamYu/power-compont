<template>
    <div class="pading5">
        <pd-table :thead="thead" :tbody="tbody" />
        <active-table></active-table>
    </div>
</template>

<script>
import activeTable from '../table/table.vue'
import pdTable from '_c/pd-table.vue'
import { getObservePointData } from '_lib/api'
import { Util } from '_lib/util'

export default {
    components: {
        pdTable,
        activeTable
    },
    data () {
        return {
            thead: ["监测点", "AQI", "空气质量指数类别", "首要污染物", "PM2.5细颗粒物", "PM10可吸入颗粒物", "CO一氧化碳" ,"NO2二氧化氮", "O3臭氧1小时平均", "O3臭氧8小时平均", "SO2二氧化硫"],
            tbody: [],
            cityCode: Util.getUrlParam("cityCode") || 320100
        }
    },
    created () {
        this.getObservePointData() //获取
    },
    methods: {
       async getObservePointData () {
           let res = await getObservePointData(this.cityCode);
           let data = res.result;
           data.map(item => {
               let obj = {
                   station: item.station,
                   aqi: item.aqi,
                   quality: item.quality,
                   pollutions: item.pollutions,
                   pm2_5: item.pm2_5,
                   pm10: item.pm10,
                   co: item.co,
                   no2: item.no2,
                   o3: item.o3,
                   o3_8h: item.o3_8h,
                   so2: item.so2
               }
               this.tbody.push(obj)
           })
        }
    }
}
</script>
