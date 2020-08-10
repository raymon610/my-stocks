var http = require('http');
const https = require('https');
var iconv = require('iconv-lite');

var fetchData = function(url){
    var promise = new Promise(function(resolve, reject) {
        var proxy = https;
        if(typeof url === "string"){
            proxy = url.startsWith("https") ? https : http;
        }
        
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
                // console.log(charset);
                charset = (["UTF", "utf"].indexOf(charset)) > -1 ? "utf8" : charset  //xueqiu的接口特殊处理
                
                // 转编码，保持跟响应一致
                let body = iconv.decode(buff, charset);
                return resolve(body);
            })
        });
        
    });
    return promise;
}

var parseDate = function(date, isFull){
　　var seperator1 = "-";
　　var seperator2 = ":";
　　var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
　　var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
　　var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
　　　　
    if(isFull){
        currentdate+= " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    }

　　return currentdate;
}

var parseString = function(str){
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + str)();
};

//获取某股票一段时间内每天的详情数据
function getStockList(p=1, s=50){
    var url = `https://xueqiu.com/service/v5/stock/screener/quote/list?page=${p}&size=${s}&order=desc&orderby=percent&order_by=percent&market=CN&type=sh_sz&${new Date()/1}`;
    return fetchData(url).then(function(data){
        var strNames = "日期,交易量,开盘价,最高价,最低价,收盘价,涨跌额,涨跌幅,换手率,成交额(亿),,,市盈率,,,,,,,,,,,,";
        var name = strNames.split(",");
        // console.log(data);

        data = parseString(data);
        // console.log(data.data.list);
        return data.data.list;
    });
}


//获取某个股票在前几天的历史数据
function getTheStockDays(stk='SH600446', day=3, bg=(new Date()/1)){
    var url = `https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=${stk}&begin=${bg}&period=day&type=before&count=-${day}&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance`;
    var option={
        hostname:'stock.xueqiu.com',
        path: url, 
        headers:{
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding':'utf-8',          //这里设置返回的编码方式 设置其他的会是乱码
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Cookie': 's=dc11m29675; device_id=5423767ef10a832d708d2759a6548755; Hm_lvt_1db88642e346389874251b5a1eded6e3=1596763493; xq_a_token=69a6c81b73f854a856169c9aab6cd45348ae1299; xq_r_token=08a169936f6c0c1b6ee5078ea407bb28f28efecf; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTU5ODMyMzAwNCwiY3RtIjoxNTk3MDI1Mzg4MjE3LCJjaWQiOiJkOWQwbjRBWnVwIn0.Y7j8P8CmMtbh5rmbIwqT4q4zWAK6CZ1UzBIJvwhJQOaY8dVkD6Vj91NZ6vbZ6JWOfHyTbpuAgBU5eYFvSwB65KVzrcBln_zbVuWvG8BY94B1dznKwwKiyY10oPL74USG3H3soaWsOHM-4eIlPJdPcbxdChDQcebXNW2xPvRhGitQKX07WnA8BT-2W0JAGYuPd5pR36bVDOGQ8DshOamJI2E3Iu0IFgH8etWMU9cKxSf7Hq1I0eMOB9lK3RkP4CNstDjao79s-fG0DRwbmuUM_bm07GPCY0i3R5yhT9Or20HGzbwe9PsCpEbln38TrQQG_VlgOfeporhXON5OnQblWg',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
        }
      };
    return fetchData(option).then(function(data){
        let strNames = "日期,交易量,开盘价,最高价,最低价,收盘价,涨跌额,涨跌幅,换手率,成交额(亿),,,市盈率,,,,,,,,,,,,";
        let name = strNames.split(",");
        // console.log(data);
        data = parseString(data);
        let flag = true;
        let stk = data.data.symbol;
        let list = data.data.item;
        return list;
    });
}
let filterSTK = [];  //连续3天涨
function  filterMM2(){
    getStockList().then(function(stkList){
        let i = 0;
        let sum = list.length;

        stkList.forEach((item)=>{
            getTheStockDays(item.symbol).then(function(list){
                var flag = true;
                list.forEach((element) => {
                    let percent = element[7];  //  [7]每天涨跌幅
                    if(percent < 0 ){
                        flag = false;
                    }
                });
                if(flag){
                    filterSTK.push(item.symbol);
                }
                i++;
                if(sum===i){
                    console.log(filterSTK);
                }
            });
        });
    });
}

var upDate = [];
function filterMM(){
    var stk = "SH600446", scd=false;
    getTheStockDays(stk, 200).then(function(list){
        var count=0;
        var yesDay;
        list.forEach((item, i)=>{
            !i && console.log(parseDate(new Date(item[0])));
            scd && upDate.push("第二天:" +item[7] +", 是否涨" + (item[7]> 0));
            //console.log(yesDay, "=====", item[1],"===" ,(yesDay && item[1] > yesDay));
            if(yesDay && (item[1]/yesDay) > 2){  //成交量是头天的2倍, 这个模式有点效果
                // count++
                // console.log("====", count);
                // if(count >= 2){
                    upDate.push(item[0]+"--"+ parseDate(new Date(item[0])));
                    // scd = true;
                // }
            }else{
                count = 0;
                scd=false;
            }
            yesDay = item[1]
        })
        console.log(upDate);
    });
}


// node环境导出
module.exports = {
    getStockList,
    getTheStockDays,
    filterMM,
}

// 以下是web的环境
// export {
    
// }



