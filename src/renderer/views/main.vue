<template>
    <div>
        <el-container class="container" id="main">
            <el-container style="position: relative;">
                <el-aside width="230px" class="aside">
                    <aside-view />
                </el-aside>
                <el-container >
                    <el-header class="header" height="42px" style="-webkit-app-region: drag">
                        <header-view height="42px" />
                    </el-header>
                    <stock-view></stock-view>
                </el-container>
            </el-container>
            <el-footer class="footer" height="70px">
            </el-footer>
        </el-container>
    </div>
</template>
<script>
    import AsideView from '../components/Aside/'
    import HeaderView from '../components/Header/'
    import StockView from '../components/Stock/frame'
  
    export default {
        data(){
            return {
                currCode: "sh600446"
            }
        },
        components: {
            AsideView
            ,HeaderView
            ,StockView
        }
    }
</script>
<style lang="scss" scoped>
    .aside {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to bottom, #efefef, #efefef);
    }

    .el-container{
        height: 100vh;
    }

    .container {
        height: 100vh;
    }

    .header {
        background: #C62F2F;
    }

    .main {
        padding: 0;
        margin: 0;
        overflow: hidden;
        display: flex;
        flex: 1;
        flex-shrink: 0;
    }

    .ifmPanel{
        border: 0;
        overflow: hidden;
    }

    .footer {
        background: #f7f7f7;
        padding: 0;
    }
</style>
