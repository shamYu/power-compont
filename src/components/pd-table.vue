<template>
    <table class="pd-td">
        <thead>
            <tr>
                <td v-for="(item, index) in thead" :key="`tb-head-${index}`">{{item}}</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in tbody" :key="`tb-body-${index}`">
                <td v-for="(j,i) in item" :key="`td-body-${i}`" v-html="`${item[i] ? item[i]  : '-'} `"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { Util } from '_lib/util'
export default {
    props: {
        thead: {
            type: Array,
            default: () => {
                return []
            }
        },
        tbody: {
            type: Array,
            default: () => {
                return []
            }
        }
    }
}
</script>

<style lang="less">
    .pd-td {
        width:100%;
        & tbody tr:nth-child(2n-1) {
            background: #f2f2f2;
        }
        & thead tr td {
            font-weight: bold;
            height: 40px;
        }
        & tr td {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 5px 10px;
        }
    }
</style>
