const express = require('express')
const app = express()
const  Pages = require('./build_pages')
var routers = express.Router();
let AqiQulityData = require('./src/config/airQuality.json'); //空气质量配置
let airCalendar = require('./src/config/airCalendar.json'); //空气日历配置
app.use('/json',routers)
const path = require('path');
const resolve = dir => path.join(__dirname,dir);
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/'

module.exports = {
  lintOnSave: false,
  // productionSourceMap: false,
  publicPath : BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@',resolve('src'))
      .set('_c',resolve('src/components'))
      .set('_s',resolve('src/assets'))
      .set('_lib',resolve('src/lib'))
  },
  //打包时不生成.map文件
  productionSourceMap: false,
  //多页面打包
  pages: Pages,
  devServer: {
    proxy: 'http://192.168.3.18:8090/maas-aqi',
    before(app) {
      app.get('/json/aqiquality',(req, res) => {
        res.json({
          code: 200,
          mes: 'success',
          data: AqiQulityData
        })
      })

      app.get('/json/airCalendar',(req, res) => {
        res.json({
          code: 200,
          mes: 'success',
          data: airCalendar
        })
      })
      
    }
  }
}