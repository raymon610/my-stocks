<template>
    <div>
        <el-container class="container" id="main">
            <el-container style="position: relative;">
                <el-aside width="230px" class="aside">
                    <aside-view />
                </el-aside>
                <!-- <el-container >
                    <el-header class="header" height="50px" style="-webkit-app-region: drag">

                    </el-header>

                </el-container> -->
                <!-- <iframe id="stockView" class="ifmPanel" scrolling="no" src="http://localhost:9080/sh600446/gp" width="787" height="567" frameborder="0"></iframe> -->
                <!--<playlist/>-->
                <stock-view></stock-view>
            </el-container>
            <el-footer class="footer" height="70px">
88
            </el-footer>
        </el-container>
    </div>
</template>
<script>
    import AsideView from '../components/Aside/'
    import StockView from '../components/Stock/'
    // import HeaderView from '../components/Header/'
    // import FooterView from '../components/Footer/'
    // import LoginView from '../components/Login/'
    // import Playlist from '../components/Playlist/'

    export default {
        data(){
            return {
                currCode: "sh600446"
            }
        },
        components: {
            AsideView
            ,StockView
            // ,HeaderView,
            // FooterView,
            // LoginView,
            // Playlist
        }
    }
</script>
<style lang="scss" scoped>
    .aside {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to bottom, #efefef, #efefef);
    }

    .container {
        height: 100vh;
    }

    .header {
        background: #fafafa;
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
