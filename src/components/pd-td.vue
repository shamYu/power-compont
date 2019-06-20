<template>
    <tr>
        <td  v-for="item in row"><i 
                        :class="{
                          'disable':item.color == 'gray',
                          'air-1' : item.AQI <= 50 && item.AQI,
                          'air-2' : item.AQI > 50 && item.AQI <=100,
                          'air-3' : item.AQI > 100 && item.AQI <=150,
                          'air-4' : item.AQI > 150 && item.AQI <=200,
                          'air-5' : item.AQI > 200 && item.AQI <=300,
                          'air-6' : item.AQI > 300 
                          }"
                          :style="styleSetting"
                          >
        {{item.dateNum}}</i></td>
    </tr>
</template>

<script>
export default {
    props: {
        row: {
            type: Array,
            default: () => []
        },
        styleSetting: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style>

</style>
