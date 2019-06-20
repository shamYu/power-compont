Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
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

let now = new Date();

export const DateUtil = {
    getYear:  now.getYear(), //获取当前年份(2位)
    getFullYear: now.getFullYear(), //获取完整的年份(4位,1970-????)
    getMonth:  Number(now.getMonth() + 1), //获取当前月份(0-11,0代表1月)
    getDate:  now.getDate(), //获取当前日(1-31)
    getDay:  now.getDay(), //获取当前星期X(0-6,0代表星期天)
    getTime:  now.getTime(), //获取当前时间(从1970.1.1开始的毫秒数)
    getHour:  now.getHours(), //获取当前小时数(0-23)
    getMinutes:  now.getMinutes(), //获取当前分钟数(0-59)
    getSeconds:  now.getSeconds(), //获取当前秒数(0-59)
    getMilliseconds:  now.getMilliseconds(), //获取当前毫秒数(0-999)
    toLocaleDateString:  now.toLocaleDateString(), //获取当前日期
    // 得到某一天是星期几
    getWeekByDay(dayValue){
        if(!dayValue) dayValue = new Date().Format('yyyy-MM-dd')
        let day = new Date(Date.parse(dayValue))
        return day.getDay()
    },
    //根据年、月获取这个月有多少天
    getMonthDays (year,month){
        if(!year) year = now.getFullYear()
        if(!month) month = Number(now.getMonth() + 1)
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
                break;
            case 2:
                if (year%4==0) {
                    return 29;
                } else {
                    return 28;
                }
                break;
            default:
                return 0;
                break;
        }
    },
    /**
     * 将时间搓格式化为 yyyy-MM-dd
     */
    dateFormat(shijianchuo){
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d);
    },
    add0(m){
        return m<10?'0'+m:m
    }
}