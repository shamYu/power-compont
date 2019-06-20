<template>
    <div class="air-item data-renwu-mss">
              <p class="item_1 air_c">
                <span>{{value}}</span><em>{{unit}}</em>
              </p>
              <div><span :style="{'width':value*100/compareValue + '%','backgroundColor': $options.filters.filterColor(value,compareValue)}"></span></div>
              <p class="item_1" v-html="formatLabel"></p>
    </div>
</template>

<script>
import { Util } from "_lib/util";
export default {
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    unit: {
      type: String,
      default: "μg/m³"
    },
    compareValue: {
      type: [String, Number],
      default: 1
    },
    label: {
      type: String,
      default: "PM2.5"
    }
  },
  computed: {
    formatLabel() {
      return this.label.replace(/\d/g, val => {
        return (val + "").sub();
      });
    }
  },
  filters: {
    filterColor(val, compare) {
      return Util.handleAqiLevel(val) && Util.handleAqiLevel(val).color;
    }
  }
};
</script>

<style lang="less">
.air-item {
  width: 33.33%;
  display: inline-block;
  margin: 10px 0;
  .air_c {
    width: 60%;
    margin: 2px auto;
    span {
      font-size: 14px;
      padding: 5px;
    }
    em {
      color: #a09898;
    }
  }
  .item_1 {
    text-align: center;
  }
}
.data-renwu-mss {
  div {
    position: relative;
    height: 5px;
    border-radius: 6px;
    background-color: #ebebeb;
    width: 60%;
    margin-top: 5px;
    margin: 0 auto;
    span {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 35%;
      border-radius: 6px;
    }
  }
}
</style>
