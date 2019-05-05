<template>
    <div class="wrap">
        <myTitle/>
        <selecter/>
        <stockList/>
    </div>
</template>
<script>
// import UserInfo from './UserInfo'
import myTitle from './myTitle'
import selecter from './selecter'
// import menus from './menu'
import stockList from './stockList'
export default {
    components: {
        // UserInfo,
        myTitle,
        selecter,
        // menus,
        stockList
    }
}
</script>
<style lang="scss" scoped>
    .wrap{
        flex: 1;
        display: flex;flex-direction: column;
    }
</style>
