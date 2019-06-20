/******************************************************************************
* Copyright (C) 2019 ShenZhen Powerdata Information Technology Co.,Ltd
* All Rights Reserved.
* 本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、
* 复制、修改或发布本软件.
*****************************************************************************/
/**
* @desc 服务接口
* @date 20190515
* @author 余旺
*/

import Axios from './axios'
import { Util } from './util'
import http from 'axios'

/**
 * 请求本地文件
 * @param url
 */
const fetch = (url, params = {}) => {
    return new Promise((resolve,reject) => {
        http.get(url,params).then( res => {
            resolve(res.data.data)
        },err => {
            reject('err:' + err)
        }).catch( err => {
            reject("catch :" + err)
        })
    })
}


/**
 * 请求通用方法 
 * @param url
 * @method GET
 */
const get = (url, params = {}) => {
     return new Promise((resolve, reject) => {
        Axios.requst({
            method: 'GET',
            url: url,
            params: params
        }).then(res => {
            resolve(res.data)
        },err => {
            reject("error :" + err)
        }).catch(err => {
            reject("catch :"  + err)
        })
    })
}

/**
 * 请求通用方法POST
 * @param url
 * @method GET
 */
const post = (url, params ={}) => {
    return new Promise((resolve, reject) => {
        Axios.requst({
            method: 'POST',
            url: url,
            data: params
        }).then(res => {
            resolve(res.data)
        },err => {
            reject("error :" + err)
        }).catch(err => {
            reject("catch :"  + err)
        })
    })
}

/**
 * 获取城市列表
 * @param provinceCode
 */
export const getcityByXzqh = provinceCode => {
    return get(`/api/v1/air/aqi-city/childrens-citys/${provinceCode}`)
}

/**
 * 获取站点列表
 * @param cityCode
 */

 export const getPointerByCityCode = cityCode => {
     return get(`/api/v1/air/aqi-station/children-stations/${cityCode}`)
 }

 /**
  * 获取城市最近小时数据
  * @param cityCode
  */

  export const getCityHourAqi = cityCode => {
    return get(`/api/v1/air/aqi-city-realtime/newest-hour-aqi/${cityCode}`)
  }

  /**
   * 获取城市日均值数据
   * @param cityCode
   */
  export const getcityDayAqi = cityCode => {
    return get(`/api/v1/air/aqi-city-realtime/newest-day-aqi/ ${cityCode}`)
  }
  
  /**
   * 获取城市小时段数据
   * @param cityCode, pageNum, pageSize, beginTime, endTime
   */

   export const getCityAqiByHour = (cityCode,params) => {
        params.pageNum  = params.pageNum ? params.pageNum :  1;
        params.pageSize = params.pageSize ? params.pageSize :31;
        return get(`/api/v1/air/aqi-city-realtime/hour-data/${cityCode}`,params)
   }


  /**
   * 获取城市当日累计
   * @param cityCode
   */
  export const getTodayCumulative = cityCode => {
      return get(`/api/v1/air/aqi-city-realtime/day-aggregate-value/${cityCode}`)
  }


  /**
   * 获取站点最近小时数据
   * @param stationCode
   */

   export const getPointHourByCode = stationCode => {
        return get(`/api/v1/air/station-realtime/newest-hour-aqi/${stationCode}`)   
   }

   /**
    * 获取站点日均值数据
    * @param stationCode
    */
   export const getPonintDayByCode = stationCode => {
       return get(`/api/v1/air/station-realtime/newest-day-aqi/${stationCode}`)   
   }
   /**
    * 获取站点当日累计
    * @param stationCode
    */
   export const getTodayPointerCumulative = stationCode => {
       return get(`/api/v1/air/station-realtime/day-aggregate-value/${stationCode}`)
   }
   
   /**
    * 获取城市时间断数据 
    * @param {cityCode} { beginTime,endTime,pageNum,pageSize }
    */
   export const getCityAqiBydate = (cityCode, params) => {
        params.pageNum  = params.pageNum ? params.pageNum :  1;
        params.pageSize = params.pageSize ? params.pageSize :31;
       return get(`/api/v1/air/aqi-city-realtime/day-data/${cityCode}`,params)
   }

   /**
    * 获取空气质量组件的配置
    * @returns
    */
   export const geConfigSetting = () => {
      return fetch('/json/aqiquality')
   }

   /**
    * AQI日历配置
    * @requires
    */
   export const getAqiCalendarSeting = () => {
       return fetch('/json/airCalendar')
   }

   /**
    * 获取监测点的数据
    * @returns
    */

    export const getObservePointData = (cityCode) => {
        return get(`/api/v1/air/station-realtime/newest-hour-aqi-ctcode/${cityCode}`)
    }

    /**
     * 获取最近24小时空气质量指数(AQI)趋势
     * @return
     */
     export const getAqi24hData = (cityCode) => {
         return get(`/api/v1/air/aqi-city-realtime/newest-dayhour-aqi/${cityCode}`)
     }