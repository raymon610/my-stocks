<template>
    <el-scrollbar class="stock-list-view scroll-page">
        <div class="stock-list">
            <li class="title">
                <span class="item1">全部</span>
                <span class="item2">最新价</span>
                <span class="item2">涨跌额</span>
                <span class="item2">涨跌幅</span>
            </li>

            <li class="item" v-for="(stock,index) in list" :key="index"  @click="viewDetail(stock)">
                <span class="item1">{{stock.SECU_NAME}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.CURRENT_PRICE}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.DIFF_PRICE}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.DIFF_RATE}}</span>
            </li>
        </div>

    </el-scrollbar>
</template>

<script>
import { getStockInfo } from '../../api/index'
import { addPreFix } from '../../../main/util/util'


export default {
    data() {
        return {
            myStocks:[
                '600516','600446'
            ],
            //list: [],
            playlists: []
        }
    },
    mounted() {
        this.getStockDetail()
    },
    methods: {
        //查看股票当前的详细信息
        viewDetail: function(stock){
            this.$store.state.stock.currCode = addPreFix(stock.SECU_CODE);
        },
        getStockDetail() {
            const args = [];
            this.myStocks.forEach(stock=>{
                args.push(addPreFix(stock));
            })
            getStockInfo(args).then(data => {
                
                console.log(decodeURIComponent(data));
                this.list = data.tags
            })
        }

    },
    // computed: {
    //     list: function(){
    //         return this.myStocks;
    //     }
    // }

    computed: {
        list: function(){
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

            // const args = [];
            // console.log(this.myStocks);
            // this.myStocks.forEach(stock=>{
            //     args.push({
            //         SECU_NAME: "金证股份",
            //         SECU_CODE: addPreFix(stock)
            //     });
            // });
            // console.log(args);
            // return args;
        }
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
        padding:0;
        li{
            list-style:none;
            span{
                display:inline-block;
                text-align: center;
            }
        }
        .title{
            border-bottom: 1px solid #cccccc;
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
            cursor: pointer;
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
