<template>
    <div class="wrap">
        <user-info/>
        <stockList/>
    </div>
</template>
<script>
import UserInfo from './UserInfo'
// import menus from './menu'
import stockList from './stockList'
export default {
    components: {
        UserInfo,
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
