import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingShow: false
  },
  mutations: {
    showLoading (state) {
      state.loadingShow = true
    },
    hideLoading (state) {
      state.loadingShow = false
    }
  },
  actions: {

  }
})
