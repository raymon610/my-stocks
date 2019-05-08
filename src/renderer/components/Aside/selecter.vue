<template>
    <div class="search no-drag">
        <el-input size="mini" v-model.trim="queryKey" prefix-icon="el-icon-search" placeholder="股票代码、名称、代码"></el-input>
    </div>
</template>

<script>
import { queryData } from '../../api/index'
import { decodeUnicode } from '../../../main/util/util'

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
            query(key) {
                let self = this;

                queryData(key).then(data => {
                    data = decodeURIComponent(data.replace(/v_hint=\"|\"/g,''))
                    data = decodeUnicode(data)
                    if(data !== 'N'){
                        data = data.split('^')
                        data = data.slice(0, data.length-1)
                        // console.log(dataVal);
                        console.log(data);
                    }
                });
            }
        }
    }
</script>