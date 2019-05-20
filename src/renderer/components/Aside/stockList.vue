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
                <span class="item1" :title="stock.SECU_CODE">{{stock.SECU_NAME}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.CURRENT_PRICE}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.DIFF_PRICE}}</span>
                <span class="item2" :class="stock.DIFF_PRICE>0 ? 'rise' : 'fall'">{{stock.DIFF_RATE}}%</span>
            </li>
        </div>

    </el-scrollbar>
</template>

<script>
import { getStockInfo } from '../../api/index'
import { addPreFix } from '../../../main/util/util'
//import { fetchStock } from '../../api/db'

export default {
    data() {
        return {
            myStocks:[
                '000718','600516','600446','600570','603383','002024'
            ],
            num: 1,
            dataVal: []
        }
    },
    mounted() {
        this.getStockDetail()

        
    },
    methods: {
        getStockList: function(){
            //fetchStock()
        },
        //查看股票当前的详细信息
        viewDetail: function(stock){
            this.$store.state.stock.currCode = addPreFix(stock.SECU_CODE)
        },
        getStockDetail() {
            const that = this;
            const args = [];
            that.myStocks.forEach(stock=>{
                args.push(addPreFix(stock))
            })
            //获取股票列表的简要信息
            getStockInfo(args).then(data => {
                data = data.split(';')
                that.dataVal = data.slice(0, data.length-1)

                that.timeOut && clearTimeout(that.timeOut);
                that.timeOut = setTimeout(() => {
                    console.log("重复"+ (that.num++));
                    that.getStockDetail();
                }, 3000);
            })
        }
    },
    computed: {
        list: function(){
            let result = [];
            //按字符串格式解析股票信息
            this.dataVal.forEach((element, index) => {
                //v_s_sz000718="51~苏宁环球~000718~3.59~0.04~1.13~108471~3885~~108.94"
                let item = {};
                let elArray = element.split('~');
                item.SECU_NAME= elArray[1];
                item.SECU_CODE = elArray[2];
                item.CURRENT_PRICE = elArray[3];
                item.DIFF_PRICE = elArray[4];
                item.DIFF_RATE = elArray[5];
                result.push(item);
            });
            return result;
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
