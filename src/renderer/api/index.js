import http from '../utils/http'

//手机登录
export function login(phone, password) {
    return http.get('/login/cellphone?phone=' + phone + '&password=' + password)
}

export function queryData(key) {
    console.log("查询的参数:"+key)
    return http.get('/queryData?v=2&q='+key+'&t=all&t='+new Date()/1);
}

//查询详细的股票信息
export function getStockDetails(stocks){
    stocks = Array.isArray(stocks) ? stocks.join(',') : stocks;
    console.log("查询的参数:"+stocks)
    return http.get('/getStockInfo?q='+stocks);
}

//查询简要的股票信息
export function getStockInfo(stocks) {
    let s = [];
    stocks = Array.isArray(stocks) ? stocks : [stocks];
    stocks.forEach(element => {
        s.push('s_'+element);
    });
    s = s.join(',');
    console.log("查询的参数:"+s)
    return http.get('/getStockInfo?q='+s);
}

export function test(){
    http.get("aip/client/test").then((response => {
        let res = response.data
        if (res) {
          this.$message({
            type: 'success',
            message: '创建成功'
          })
          this.$router.push('/')
        }
      })).catch(err => {
        console.log(err)
      });
}
