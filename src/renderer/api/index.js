import http from '../utils/http'

//手机登录
export function login(phone, password) {
    return http.get('/login/cellphone?phone=' + phone + '&password=' + password)
}


export function getStockInfo(stocks) {
    stocks = Array.isArray(stocks) ? stocks.join(',') : stocks;
    console.log("查询的参数:"+stocks)
    return http.get('/query?q='+stocks+"&t="+new Date()/1);
}
