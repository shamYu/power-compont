import Vue from '@/powerData'
import aqiTrend from './aqiTrend.vue'
import router from '@/router'
import store from '@/store'

new Vue({
  router,
  store,
  render: h => h(aqiTrend)
}).$mount('#aqiTrend')
