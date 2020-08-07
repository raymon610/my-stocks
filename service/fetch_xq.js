var http = require('http');
const https = require('https');
var iconv = require('iconv-lite');

var fetchData = function(url){
    var promise = new Promise(function(resolve, reject) {
        var proxy = url.startsWith("https") ? https : http;
        proxy.get(url,function(data){
            const chunks = [];
            data.on("data",function(chunk){
                //str+=chunk;//监听数据响应，拼接数据片段
                chunks.push(chunk);
            })
            data.on("end",function(){
                let buff = Buffer.concat(chunks), headers = data.headers;
                let headStr = headers['content-type'].match(/(?:charset=)(\w+)/);
                // 从响应头中提取 charset
                let charset = headStr && headStr[1] || 'utf8';
                charset = (charset === "utf") ? "utf8" : charset  //xueqiu的接口特殊处理
                
                // 转编码，保持跟响应一致
                let body = iconv.decode(buff, charset);
                return resolve(body);
            })
        });
        
    });
    return promise;
}

var parseString = function(str){
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + str)();
};

//获取某股票一段时间内每天的详情数据
function getTheStockDays(p=1, s=50){
    var url = `https://xueqiu.com/service/v5/stock/screener/quote/list?page=${p}&size=${s}&order=desc&orderby=percent&order_by=percent&market=CN&type=sh_sz&${new Date()/1}`;
    fetchData(url).then(function(data){
        var strNames = "日期,交易量,开盘价,最高价,最低价,收盘价,涨跌额,涨跌幅,换手率,成交额(亿),,,市盈率,,,,,,,,,,,,";
        var name = strNames.split(",");
        console.log(name);
        data = parseString(data);
        console.log(data.data.list);
        /**
        symbol: 'SZ002866',
        net_profit_cagr: -0.6810603135336213,
        ps: 4.062099076151321,
        type: 11,
        percent: 10.02,
        has_follow: false,
        tick_size: 0.01,
        pb_ttm: 5.529,
        float_shares: 133822100,
        current: 24.05,
        amplitude: 14.87,
        pcf: 43.07709934475684,
        current_year_percent: 71.87,
        float_market_capital: 3218421505,
        market_capital: 5998090443,
        dividend_yield: 0.374,
        lot_size: 100,
        roe_ttm: 7.123643463392597,
        total_percent: 159.44,
        percent5m: 0,
        income_cagr: 24.770132828432544,
        amount: 511361040.81,
        chg: 2.19,
        issue_date_ts: 1493136000000,
        main_net_inflows: -1782865,
        volume: 22885762,
        volume_ratio: 1,
        pb: 5.529,
        followers: 6616,
        turnover_rate: 17.1,
        first_percent: 44.03,
        name: '传艺科技',
        pe_ttm: 80.034,
        total_shares: 249400850  */
    });
}


// node环境导出
module.exports = {
    getTheStockDays
}

// 以下是web的环境
// export {
    
// }

/*
//获取4天的股票价格
fetchData('https://xueqiu.com/service/v5/stock/screener/quote/list?page=1&size=50&order=desc&orderby=percent&order_by=percent&market=CN&type=sh_sz&_=1596765697305').then(function(data){
    var ob = JSON.parse(data);
    //console.log(ob);
});

//指定日期的股票市场的涨停热度
fetchData('http://home.flashdata2.jrj.com.cn/limitStatistic/ztForce/20200417.js').then(function(data){
    var val = data.split("=");
    var ob = parseString(val[1])
    
    //console.log("涨停版的股票");
    var name = ['代码', '名称', '最新价格', '涨跌幅', '封成比', '封流比', '封单金额',
                 '最后一次涨停时间', '第一次涨停时间', '打开次数', '振幅', '涨停强度']
    ob.Data.forEach((itemArr)=> {
        var item = [];
        itemArr.forEach((val, i)=>{
            item.push(`${name[i]}:${itemArr[i]}`);
        })
        //console.log(item.join(", "));
    });
});

//涨停强度分析
fetchData(`http://hqdata.jrj.com.cn/zrztjrbx/limitup.js?${new Date()/1}`).then(function(data){
    var val = data.split("=");
    var ob = parseString(val[1])
    var name = ['序号', '代码', '名称', '昨日涨停时间', '最新价格', '今日涨幅', '最大涨幅', '最大跌幅', '是否连板', '连续涨停次数',
    '昨日涨停强度', '今日涨停强度', '是否停牌', '昨天的日期', '昨日涨停价', '今日开盘价格', '今日开盘涨幅'];

    console.log("涨停强度分析");
    ob.Data.forEach((itemArr)=> {
        var item = [];
        itemArr.forEach((val, i)=>{
            item.push(`${name[i]}:${itemArr[i]}`);
        })
        console.log(item.join(", "));
    });

})
*/



