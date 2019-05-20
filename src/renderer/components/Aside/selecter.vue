<template>
    <div class="search-wrap no-drag">
        <el-input size="mini" v-model.trim="queryKey" prefix-icon="el-icon-search" placeholder="股票代码、名称、代码"></el-input>
        <div v-if="dataVal.length" class="search-data-wrap">
            <li class="item" v-for="(stock,index) in dataVal" :key="index">
                <span class="item1"><a link="#" @click="viewDetail(stock)">{{stock.SECU_CODE}}</a></span>
                <span class="item2">{{stock.SECU_NAME}}</span>
            </li>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.search-wrap{
    position: relative;
    top: 0;
    left: 0;
    z-index: 10;
}
.search-data-wrap{
    position: absolute;
    top:28px;
    font-size: 13px;
    padding: 0;
    margin-left: 28px;
    margin-right: 2px;
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    padding:0;
        li:hover {
            background: rgba(0, 0, 0, 0.3);
            .iconfont {
                transition: color 0.3s linear;
                opacity: 1;
                color: white;
            }
            .iconfont:hover {
                color: #31c27c;
            }
        }
        li{
            list-style:none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 5px;
            a{
                cursor: pointer;
            }
            span{
                display:inline-block;
            }
            .item1{
                width:100px;
                vertical-align: top;
            }
            .item2{
                overflow: hidden;
                width: 90px;
                text-overflow: ellipsis;
            }
        }
}
</style>
<script>
import { queryData } from '../../api/index'
import { decodeUnicode, addPreFix } from '../../../main/util/util'

    export default {
        data() {
            return {
                dataVal: [],
                queryKey: ""
            }
        },
        watch: {
            queryKey(curVal, oldVal) {
                let self = this;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    self.query(curVal);
                }, 300);
            }
        },
        methods: {
            //查看股票当前的详细信息
            viewDetail: function(stock){
                this.$store.state.stock.currCode = addPreFix(stock.SECU_CODE)
            },
            query(key) {
                let self = this;

                queryData(key).then(data => {
                    self.dataVal = [];  //清空
                    data = decodeURIComponent(data.replace(/v_hint=\"|\"|\;/g,''))
                    data = decodeUnicode(data)
                    if(data.trim() !== 'N'){
                        data = data.split('^')
                        //最多显示10个
                        //data = data.slice(0, data.length > 10 ? 10 : data.length-1)
                        data.forEach((element, index) => {
                            let item = element.split('~')
                            item = item.slice(0, item.length-1)
                            self.dataVal.push({
                                SECU_CODE:item[1],
                                SECU_NAME:item[2]
                            })
                        })
                    }
                    //console.log(self.dataVal, self.showList);
                });
            }
        }
    }
</script>