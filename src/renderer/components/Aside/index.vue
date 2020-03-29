<template>
    <div class="wrap">
        <myTitle/>
        <selecter/>
        <stockList/>
    </div>
</template>
<script>
import myTitle from './myTitle'
import selecter from './selecter'
import stockList from './stockList'
export default {
    components: {
        myTitle,
        selecter,
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
