<template>
    <el-scrollbar class="stock-list-view scroll-page">
        <div class="stock-list">
            <li class="title">
                <span class="item1">全部</span>
                <span class="item2">最新价</span>
                <span class="item2">涨跌额</span>
                <span class="item2">涨跌幅</span>
            </li>

            <li class="item" v-for="(stock,index) in list" :key="index">
                <span class="item1">{{stock.SECU_NAME}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.CURRENT_PRICE}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.DIFF_PRICE}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.DIFF_RATE}}</span>
            </li>
        </div>

    </el-scrollbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        list() {
            return [
                {
                    'SECU_NAME': '方大碳素',
                    'SECU_CODE': '600516',
                    'CURRENT_PRICE': '12.56',
                    'DIFF_PRICE': '-0.25',
                    'DIFF_RATE': '1.22%'
                },
                {
                    'SECU_NAME': '金证股份',
                    'SECU_CODE': '600446',
                    'CURRENT_PRICE': '30.50',
                    'DIFF_PRICE': 0.47,
                    'DIFF_RATE': '1.15%'
                }
            ]
        },
        isRise : true
    }
}
</script>

<style lang="scss" scoped>
    .scroll-page {
        overflow: hidden;
        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
        }
    }

.stock-list-view{
    flex: 1;
    overflow: hidden;
    font-size: 13px;
    .stock-list{
        padding:0 5px;
        li{
            list-style:none;
            span{
                display:inline-block;
                text-align: center;
            }
        }
        .title{
            background-color: #cccccc;
            height: 30px;
            line-height: 30px;
            .item1,
            .item2{
                text-align: center;
            }
        }
        .item{
            height: 25px;
            line-height: 25px;
            span{
                text-align: right;
            }
        }
        .item1{
            width: 60px;
        }
        .item2{
            width: 45px;
        }
        .rise{
            color: red;
        }
        .fall{
            color: green;
        }

    }
}
</style>
