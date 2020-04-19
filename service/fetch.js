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

fetchData('http://img1.money.126.net/data/hs/time/4days/0600446.json').then(function(data){
    var ob = JSON.parse(data);
    console.log(ob);
});
fetchData('http://home.flashdata2.jrj.com.cn/limitStatistic/ztForce/20200417.js').then(function(data){
    
    console.log(data);
});




