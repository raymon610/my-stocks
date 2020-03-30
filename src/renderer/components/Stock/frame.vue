<template>
    <!-- <el-scrollbar class="stock-detail-view scroll-page"> -->
        <!-- <transition name="fade" mode="out-in"> -->
            <div>
                <iframe id="stockView" class="ifmPanel" @load="childReady" scrolling="no" 
                :src="getURL" width="787" height="606" frameborder="0"></iframe>
                <div class="mask-msg" v-if="!isChildReady">加载中...</div>
            </div>
        <!-- </transition> -->
    <!-- </el-scrollbar> -->
</template>
<script>
import { addPreFix } from '../../../main/util/util'
export default {
    // mounted () {
    //     var _this = this
    //     const iframe = document.querySelector('#stockView')
    //     // 处理兼容行问题
    //     if (iframe.attachEvent) {
    //     iframe.attachEvent('onload', function () {
    //         // iframe加载完毕以后执行操作
    //         alert('iframe已加载完毕1')
    //     })
    //     } else {
    //         iframe.onload = function () {
    //             // iframe加载完毕以后执行操作
    //             alert('iframe已加载完毕2')
    //         }
    //     }
    // },
    methods: {
        childReady() {
            this.showChartPanel();
            this.isChildReady = true;
        },
        //只显示需要的k线图区域
        showChartPanel() {
            
            //刷新时每次都会触发
            const iframe = this.iframe = document.getElementById('stockView');
            const iframeDom = iframe.contentWindow.document;
            
            const $ = this.$ = function(str){
                return iframeDom.querySelector(str);
            }

            const hide = function(dom){
                if(dom){
                    dom.style.display = "none";
                }
            }

            //根据图片的位置来进行位移
            const chartDom = $(".right_side");
            const chartRect= chartDom.getBoundingClientRect();

            const rootDom = $("#root");

            //定位只显示图表
            rootDom.style.position='relative';
            rootDom.style.top= (0 - chartRect.top) + 'px';
            rootDom.style.left= (0 - chartRect.left) + 'px';

            //隐藏相关的区域
            hide($("#left_maxcard"));  //二维码
            hide($("#mod-tztips"));    //当前股票信息的公告提示
            hide($(".gjzq-ad"));       //手机自选股广告
            hide($(".right_side").querySelector(".spacer"));    //间隔
            hide($("#content_wrap").querySelector(".compare"));//隐藏股票对比
            
            //港股相关的扩展信息
            hide($("#div-multi-exchange"));
            hide($("#div-multi-exchange").parentNode);

            const topWrap = $("#content_wrap").querySelector(".hq-ad-ctn");
            //股票实时信息右侧的广告图片
            const tmpDom = $("#content_wrap").querySelector(".hq-ad-ctn>.col-2");
            tmpDom.style.display = "none";

            const hasClass = function( elements,cName ){ 
                return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
            };
            const removeClass = function(elements,cName ){ 
                if( hasClass( elements,cName ) ){ 
                    elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
                }; 
            };
            removeClass(topWrap, "gb_con");
            const top5Dom = $("#main-quotinfo-col-2");

            const mainQuotinfo = $("#main-quotinfo");
            removeClass(mainQuotinfo, "gb_con");

            
            const top5DomP = top5Dom.parentNode;
            top5Dom.style.position='relative';
            top5Dom.style.top='-121px';
            top5Dom.style.left='0';
            
            iframe.style.opacity = 1;
            this.replaceEvent();
            this.isChildReady = false;
        },
        //替换需要的
        replaceEvent(){
            const that = this;
            const relatedDom = this.$("#mod-flashpanel").nextSibling
            let linkList= relatedDom.querySelectorAll("a")
            linkList.forEach(link => {
                link.href = link.href.replace("//gu.qq.com/", "//localhost:9080/")
                link.onclick = function(){
                    that.isChildReady = true;
                    that.iframe.style.opacity = 0;
                    // that.$store.state.stock.currCode = addPreFix(stock.SECU_CODE)
                    that.$store.state.stock.SET_CURR_CODE(addPreFix(stock.SECU_CODE));
                }
            });
        }


    },
    watch: {
        getURL (newVal, oldVal) {
            //从左边点击股票会进入到这，先隐藏iframe
            const iframe = document.getElementById('stockView');
            iframe.style.opacity = 0;
        }
    },
    computed: {
        getURL() {
            return 'http://localhost:9080/'+this.$store.state.stock.currCode+'/gp?t='+new Date()/1
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
        height: 606px;
    }

    .stock-detail-view{
        overflow: hidden;
    }

    .mask-msg{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 787px;
        height: 606px;
    }
</style>
