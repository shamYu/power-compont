<template>
  <div id="app">
     <div class="col col-12">
						<div class="mod calendar-body">
							<!-- AQI日历 -->
                <div class="calendar-body-hd" :style="css.header">
                  <div class="hd-tit-lf">
                      AQI日历
                  </div>
                  <div class="hd-tit-rt">
                      <Icon @click="handBackClick":size="arrowSize" class="cursor" type="ios-arrow-back" />
                      <span>{{dateVal}}</span>
                      <Icon @click="handForwardClick" :size="arrowSize" class="cursor" type="ios-arrow-forward" />
                  </div>
                </div>
								<div class="calendar-bd">
									<table cellpadding="0" cellspacing="0" width="100%" :style="css.table">
										<thead>
											<tr>
												<td>日</td>
												<td>一</td>
												<td>二</td>
												<td>三</td>
												<td>四</td>
												<td>五</td>
												<td>六</td>
											</tr>
										</thead>
										<tbody>
                        <pd-td :row="dateBox.slice(0,7)" :styleSetting="tdsetting"></pd-td>
                        <pd-td :row="dateBox.slice(7,14)" :styleSetting="tdsetting"></pd-td>
                        <pd-td :row="dateBox.slice(14,21)" :styleSetting="tdsetting"></pd-td>
                        <pd-td :row="dateBox.slice(21,28)" :styleSetting="tdsetting"></pd-td>
                        <pd-td :row="dateBox.slice(28,35)" :styleSetting="tdsetting"></pd-td>
                        <pd-td :row="dateBox.slice(35,42)" :styleSetting="tdsetting"></pd-td>
										</tbody>
									</table>
                  <div class="gap"></div>
								</div>
						</div>
					</div>
  </div>
</template>

<script>
import { DateUtil } from "_lib/dateUtil";
import { getCityAqiBydate, getAqiCalendarSeting } from "_lib/api";
import { Util } from "_lib/util";
import PowerHeader from "_c/PowerHeader.vue";
import pdTd from "_c/pd-td.vue"
export default {
  props: {
    year: {
      type: [Number, String],
      default: new Date().getFullYear()
    },
    month: {
      type: [Number, String],
      default: Number(new Date().getMonth() + 1)
    },
    arrowSize:{
      type: [ Number, String ],
      default: 20
    }
  },
  data() {
    return {
      headerTitle: "AQI日历",
      cityCode: (Util.getUrlParam() && Util.getUrlParam().XZQHDM) || 430100,
      currentYear: new Date().getFullYear(),
      currentMonth: Number(new Date().getMonth() + 1),
      week: 0, //星期,  0  代表星期天
      days: 31, //一个月有多少天,
      dateBox: [], //放日历的盒子
      objAqi: {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        level5: 0,
        level6: 0,
        level7: 0
      },
      css: {
        header:{
            "fontSize": "14px",
            "fontFamily":"Avenir, Helvetica, Arial, sans-serif",
            "color":"white",
            "background":"rgb(33, 222, 131)"
        },
        table: {
           "fontSize": "14px"
        },
        td: {
           "width": "40px",
           "height": "20px"
        }
      }
    };
  },
  components: {
    PowerHeader,
    pdTd
  },
  mounted() {
    this.renderDate();
    this.getAqiCalendarSeting()
  },
  computed: {
    yearList() {
      return this.calcSelectNumberl(2010, new Date().getFullYear());
    },
    monthList() {
      return this.calcSelectNumberl(1, 12);
    },
    dateVal() {
        return this.currentYear + '-' + DateUtil.add0(this.currentMonth)
      },
      //日历里面日期的样式控制
      tdsetting() {
        return {
          "width": this.css.td.width,
          "height": this.css.td.height,
          "lineHeight": this.css.td.height
        }
      }
  },
  methods: {
    async getAqiCalendarSeting() {
      let res = await getAqiCalendarSeting()
      if(res.result) Object.assign(this.css,res.result)
    },
    handleSelect(d) {
      let val = d.split("-");
      this.currentYear = Number(val[0]);
      this.currentMonth = Number(val[1]);
    },
    changeForYear(index) {
      this.currentYear = Number(this.yearList[index].value);
    },
    changeForMonth(index) {
      this.currentMonth = Number(this.monthList[index].value);
    },
    //计算区间
    calcSelectNumberl(start, end) {
      let arr = [];
      for (let i = start; i <= end; i++) {
        let item = {
          label: i.toString(),
          value: i.toString()
        };
        arr.push(item);
      }
      return arr;
    },
    //渲染日期
    renderDate() {
      let box = []; //用来装日历天数.
      let year = this.currentYear;
      let month = this.currentMonth;
      let m = month < 10 ? "0" + month : month;
      let concatDate = year + "-" + m + "-" + "01";
      this.week = DateUtil.getWeekByDay(concatDate); //获取星期几
      this.days = DateUtil.getMonthDays(year, month); //获取一个月有多少天
      let lastMonthDays = DateUtil.getMonthDays(year, month - 1); //获取上一个月有多少天
      let lastMonthLastDays = this.week; //上一个月最后几天灰色
      //dateBox 先渲染上一个灰色的数据
      for (let i = lastMonthDays - this.week + 1; i <= lastMonthDays; i++) {
        let lastMonth = month - 1 < 10 ? "0" + (month - 1) : month - 1;
        box.push({
          color: "gray",
          dateNum: i,
          AQI: "",
          quality: "",
          date: year + "-" + lastMonth + "-" + i
        });
      }
      // push 本月的数据
      for (let i = 1; i <= this.days; i++) {
        let num = i < 10 ? "0" + i : i;
        let c_month = month < 10 ? "0" + month : month;
        box.push({
          color: "nomal",
          dateNum: i,
          AQI: "",
          quality: "",
          date: year + "-" + c_month + "-" + num
        });
      }
      //dateBox 下一个月灰色的数据
      let nextMthDay = 42 - box.length;
      let nextMonth = Number(month + 1);
      for (let i = 1; i <= nextMthDay; i++) {
        let num = i < 10 ? "0" + i : i;
        let n_month = nextMonth < 10 ? "0" + nextMonth : nextMonth;
        box.push({
          color: "gray",
          dateNum: i,
          AQI: "",
          quality: "--",
          date: year + "-" + n_month + "-" + num
        });
      }
      this.dateBox = box;
      let param = {
        beginTime: year + "-" + m + "-" + "01 " + "00:00:00",
        endTime: year + "-" + m + "-" + this.days + " 23:59:59"
      };
      this.getAqiData(param);
    },
    //获取AQI数据
    async getAqiData(param) {
      let res = await getCityAqiBydate(this.cityCode, param);
      let list = res.result && res.result.list;
      let box = this.dateBox;
      let level_1 = 0,
        level_2 = 0,
        level_3 = 0,
        level_4 = 0,
        level_5 = 0,
        level_6 = 0,
        level_7 = 0;
      //整合日历日期和AQI数据
      if (list && list.length > 0) {
        list.map(i => {
          let i_date = DateUtil.dateFormat(i.pubtime);
          box.map((j, index) => {
            if (j.date === i_date) {
              box[index].AQI = i.aqi;
              box[index].quality = i.quality;
            }
          });
          //算优良天数

          let value = i.aqi;
          if (value <= 50 && value) {
            level_1++;
          } else if (value > 50 && value <= 100 && value) {
            level_2++;
          } else if (value > 100 && value <= 150 && value) {
            level_3++;
          } else if (value > 150 && value <= 200 && value) {
            level_4++;
          } else if (value > 200 && value <= 300 && value) {
            level_5++;
          } else if (value > 300 && value) {
            level_6++;
          } else if (!value) {
            level_7++; //aqi没数据的或者等于null的
          }
        });
      }
      Object.assign(this.objAqi, {
        level1: level_1,
        level2: level_2,
        level3: level_3,
        level4: level_4,
        level5: level_5,
        level6: level_6,
        level7: level_7,
        level8:
          new Date().getMonth() + 1 == this.currentMonth
            ? this.calcDaysforDisConect(list.length)
            : this.days - list.length
      });
      this.dateBox = box;
    },
    //计算离线天数
    calcDaysforDisConect(len) {
      let currentDay = new Date().getDate();
      return this.days - (this.days - currentDay) - len;
    },
    handBackClick() {
      if(this.currentMonth == 1){
        this.currentYear -- 
        this.currentMonth = 12
      } else this.currentMonth--
    },
    handForwardClick() {
      if(this.currentMonth == 12){
        this.currentYear ++ 
        this.currentMonth = 1
      }else this.currentMonth++; 
    }
  },
  watch: {
    currentYear(newVal) {
      this.renderDate();
    },
    currentMonth(newMonth) {
      this.renderDate();
    }
  }
};
</script>

<style lang="less">
.calendar-body {
  min-height: 260px;
  border: 1px solid #eee;
  &-hd{
    height: 40px;
    background: #21DE83;
    overflow: hidden;
    display: flex;
    color: white;
    font-size: 14px;
    .hd-tit-lf{
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px; 
    }
    .hd-tit-rt{
      width: 50%;
       display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 10px;
      .cursor{
        cursor: pointer;
      }
    }
  }
}
</style>
