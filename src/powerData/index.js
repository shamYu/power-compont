import Vue from 'vue'
import { PdGlobal } from './global';
import iView from 'iview'
import echarts from 'echarts'
import '_s/css/reset.css';
import '_s/css/style.css';
import 'iview/dist/styles/iview.css';
Vue.prototype.$echarts = echarts;
Vue.prototype.$Global = PdGlobal;


Vue.use(iView);
Vue.config.productionTip = false


export default Vue
