<template>
    <el-scrollbar class="stock-detail-view scroll-page"> 
        <transition name="fade" mode="out-in"> 
            <!-- <div class="mask-msg" v-if="!isChildReady">加载中...</div> -->

            <div ref="chartMin" style="width:540px;height:300px"></div>
        </transition>
    </el-scrollbar>
</template>
<script>
import { addPreFix } from '../../../main/util/util'
// import jsonp from 'jsonp'
import echarts from 'echarts'
import fetch from '../../utils/fetch'
export default {
    data() {
      return{
        code: 'sh600000',
        data1: [],
        data2: [],
        data3: [],
      }
    },
    methods: {
        childReady() {
            this.showChart();
            this.isChildReady = true;
        },
        showChart() {
           
        },


        getChart() {

            // 第三方接口，需要实时刷新用的定时器，并未做websocket的处理，有需要可以自己加
            // this.timer = setInterval(() => {
            // vue项目中为了规范，跨域请求封装了jsonp的方法
            fetch.getRealTime(this.code).then((res) => {
                this.data1 = res.data1;
                this.data2 = res.data2;
                this.data3 = res.data3;
                this.chart.setOption({
                // 图相对于容器的位置
                    grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    },
                    tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                        backgroundColor: '#505765',
                        },
                    },
                    },
                    // 下方滑块
                    // dataZoom: [
                    //     {
                    //         show: true,
                    //         realtime: true,
                    //     },
                    //     {
                    //         type: 'inside',
                    //         realtime: true,
                    //     },
                    // ],
                    xAxis: [
                    {
                        type : 'category',
                        boundaryGap : false,
                        axisLine: {onZero: false},
                        data : this.data1
                        .map((str) => {
                            return str.replace(' ', '\n');
                        }),
                    },
                    ],
                    yAxis: [
                    {
                        name: '价格',
                        type: 'value',
                        scale: true,
                        splitNumber: 4,
                    },
                    {
                        name: '涨跌幅(%)',
                        type: 'value',
                        scale: true,
                        splitNumber: 4,
                        splitLine: false,
                    },
                    ],
                    series: [
                    {
                        name: '价格',
                        type: 'line',
                        animation: false,
                        symbol: 'none',
                        lineStyle: {
                            width: 1,
                        },
                        data: this.data2,
                    },
                    {
                        name: '涨跌幅',
                        type: 'line',
                        yAxisIndex: 1,
                        animation: false,
                        symbol: 'none',
                        lineStyle: {
                        width: 1,
                        color: 'transparent',
                        },
                        markLine: {
                        silent: true,
                        // 去掉箭头
                        symbol: 'none',
                        data: [{
                            yAxis: 0,
                        }],
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                color: 'red',
                            },
                        },
                        label: {
                            formatter: '',
                        },
                        },
                        data: this.data3,
                    },
                    ],
                });
            }).catch((error)=>{
                console.log(error);
            });
            // },3000);
        },

        initchart() {
            this.chart = echarts.init(this.$refs.chartMin);
        },
    },
    mounted () {
      this.initchart();
      this.getChart();
    }
}
</script>
<style lang="scss" scoped>
    .mask-msg{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 787px;
        height: 567px;
    }
</style>
