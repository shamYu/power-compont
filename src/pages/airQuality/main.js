import Vue from '@/powerData'
import airQuality from './airQuality.vue'
import router from '@/router'
import store from '@/store'

new Vue({
  router,
  store,
  render: h => h(airQuality)
}).$mount('#airQuality')
