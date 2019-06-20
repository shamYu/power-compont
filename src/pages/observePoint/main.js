import Vue from '@/powerData'
import observePoint from './observePoint.vue'
import router from '@/router'
import store from '@/store'

new Vue({
  router,
  store,
  render: h => h(observePoint)
}).$mount('#observePoint')
