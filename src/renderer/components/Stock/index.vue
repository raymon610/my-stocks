<template>
    <el-scrollbar class="stock-detail-view scroll-page">
        <!-- <transition name="fade" mode="out-in"> -->
            <iframe id="stockView" class="ifmPanel" @load="showOnlyChart" scrolling="no" 
            :src="getURL" width="787" height="567" frameborder="0"></iframe>
            <!-- <div class="mask-msg" v-if="!isChildReady">加载中...</div> -->
        <!-- </transition> -->
    </el-scrollbar>
</template>
<script>
import { addPreFix } from '../../../main/util/util'
export default {
    methods: {
        childReady() {
            this.showOnlyChart();
            this.isChildReady = true;
        },
        showOnlyChart() {
            const iframe = document.getElementById('stockView');
            const iframeDom = iframe.contentWindow.document;
            const rootDom = iframeDom.querySelector("#root");

            //定位只显示图表
            rootDom.style.position='relative';
            rootDom.style.top='-253px';
            rootDom.style.left='-193px';

            //隐藏广告
            iframeDom.querySelector("#left_maxcard").style.display = 'none';  //二维码
            iframeDom.querySelector("#mod-tztips").style.display = 'none';    //当前股票信息的公告提示
            iframeDom.querySelector(".gjzq-ad").style.display = 'none';       //手机自选股广告
            iframeDom.querySelector("#content_wrap").querySelector(".hq-ad-ctn>.col-2").style.display = 'none';

            iframe.style.opacity = 1;
        }
    },
    watch: {
        getURL (newVal, oldVal) {
            const iframe = document.getElementById('stockView');
            iframe.style.opacity = 0;
        }
    },
    computed: {
        getURL() {
            return 'http://localhost:9080/'+this.$store.state.stock.currCode+'/gp'
        }
    }
}
</script>
<style lang="scss" scoped>
    .ifmPanel{
        opacity: 0;
        border: 0;
        overflow: hidden;
        width: 787px;
        height: 567px;
    }

    .mask-msg{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 787px;
        height: 567px;
    }
</style>
