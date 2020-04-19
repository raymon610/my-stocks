var http = require('http');
var iconv = require('iconv-lite');

var fetchData = function(url){
    var promise = new Promise(function(resolve, reject) {
        http.get(url,function(data){
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



//获取4天的股票价格
fetchData('http://img1.money.126.net/data/hs/time/4days/0600446.json').then(function(data){
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




