/******************************************************************************
* Copyright (C) 2019 ShenZhen Powerdata Information Technology Co.,Ltd
* All Rights Reserved.
* 本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、
* 复制、修改或发布本软件.
*****************************************************************************/
/**
* @desc 工具类
* @date 20190515
* @author 余旺
*/

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export const Util = {
    /**
     * 获取当前时间
     */
    getCurrentDate(formatType = 'yyyy-MM-dd'){
        return new Date().Format(formatType)
    },
    /**
     * 获取Url问号后面的参数
     */
    getUrlParam (name){
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r !== null) return  decodeURI(r[2]); return null;
    },
    /**
     * 获取项目根webRoot
     */
    getContextPath:()=>{
        let url = window.location.href;
        url = url.replace(new RegExp("http(s)?\://[\\w\.\\w]+(\:[0-9]{2,5})?/"), ""); 
        let index = url.indexOf("/");
          url = index > 0 ? url.substring(0, index) : url.substring(0);
        return "/"+url
    },
    /**
     * 根据AQI的获取颜色
     */
    handleAqiLevel(value){
        let color ='#25bf61',level = '优';
            if( value <= 50 ) {
                color = '#25bf61'; level = '优';
            }else if( value > 50 && value <=100 ){
                color = '#d8bc38'; level = '良';
            }else if( value > 100 && value <=150 ){
                color = '#f87c10'; level = '轻度污染';
            } else if( value > 150 && value <=200 ){
                color = '#f50300'; level = '中度污染';
            }else if( value > 200 && value <=300 ){
                color = '#B4014B'; level = '重度污染';
            } else if( value > 300) {
                color = '#6f0020'; level = '严重污染';
            }else{
                color = '#25bf61'; level = '优';
            } 
        return {
            value:value,
            color:color,
            level:level
        }
    },
    isType(type) {
        return target => `[Object ${type}]` === Object.prototype.toString.call(target)
    }
}