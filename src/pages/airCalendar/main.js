import Vue from '@/powerData'
import airCalendar from './airCalendar.vue'
import router from '@/router'
import store from '@/store'


new Vue({
  router,
  store,
  render: h => h(airCalendar)
}).$mount('#airCalendar')
