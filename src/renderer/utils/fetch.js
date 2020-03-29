import jsonp from 'jsonp'
import axios from 'axios'

/**
 * 和讯网当天的K线图
 * http://webstock.quote.hermes.hexun.com/a/minute?code=sse600000&start=20170424000000&number=6000
 * http://webstock.quote.hermes.hexun.com/a/minute?code=szse002024&start=20170424000000&number=6000
 * */

let dayRealTimeHX = "http://webstock.quote.hermes.hexun.com/a/minute?code=";

 /**
  * 腾讯网当天的K线图
  * http://data.gtimg.cn/flashdata/hushen/minute/sz002024.js?maxage=110&0.28163905744440854
  * http://data.gtimg.cn/flashdata/hushen/minute/sh600446.js?maxage=110&0.28163905744440854
  */

let dayRealTimeTX = "http://data.gtimg.cn/flashdata/hushen/minute/";

const getTXDayRealTimeURL  = function(SECU_CODE){
    return dayRealTimeTX+SECU_CODE+".js?code="+SECU_CODE+"&start=20181026000000&number=6000";
};
const getHXDayRealTimeURL = function(SECU_CODE){
    let code = SECU_CODE.slice(2);
    let type = "szse";
    if (code == 6) {
        type = 'sse';
    }
    return dayRealTimeHX+type+code+"&start=20181026000000&number=6000";
}

//解析和讯接口返回的数据
const fitHXDayData = function(res){
    let result = {
        data1: [],
        data2: [],
        data3:[]
    };
    const total = res.Data[0];
    
    let amStart = res.Data[5]/100
    let amEnd = "".replace.call(amStart, "0930", "1130");
    let pmStart = "".replace.call(amStart, "0930", "1301");
    let pmEnd = res.Data[6]/100
    let index = 0;

    const loopOverlayTime = function(start, end){
        start = Number(start);
        end = Number(end);
        for(let i=0; i<= end-start; i++){
            let miniStr = String(start+i);
            let min = miniStr.substr(miniStr.length-2,2)
            
            if(min >= 60){
                miniStr = miniStr +100;
                miniStr = Number(String(miniStr).substr(0, miniStr.length-2)+"00");
                continue;
            }
            let time = (miniStr)*100;

            const addTime = (time)=>{
                time = String(time);
                const year = time.slice(0, 4);
                const month = time.slice(4, 6);
                const day = time.slice(6, 8);
                const hour = time.slice(8, 10);
                const minute = time.slice(10, 12);
                const second = time.slice(12, 14);
                const yeartwo = year + '-' + month + '-' + day;
                const timetwo = hour + ':' + minute ;
                result.data1.push(timetwo);
            }
            addTime(time);

            console.log("index==", index ,"---", time, "---",total[index]);
            if(total[index] && total[index][0] === time){
                const chartprice = total[index][1] / 100;
                result.data2.push(chartprice);
                //昨收价是从另一个接口获取的
                // const chg = parseFloat(Number((chartprice - that.yes) / that.yes * 100)).toFixed(2);
                // result.data3.push(chg);
            }

            index++;
        }
    }

    loopOverlayTime(amStart, amEnd);
    loopOverlayTime(pmStart, pmEnd);

    return result;
}

//解析腾讯接口返回的数据
const fitTXDayData = function(){
    console.log("---------------------------");
}

window.__jp0 = fitTXDayData;

export default {
    //获取当天的实时K线图数据
    getRealTime(SECU_CODE){
        let url = getTXDayRealTimeURL(SECU_CODE);
        // let url = getHXDayRealTimeURL(SECU_CODE);

        return new Promise((resolve, reject) => {
            console.log(url)
            // jsonp(url, null, (error, body) => {
            jsonp(url, {timeout: 5000 }, (error, body) => {
                console.log("==================", error, body);
                if (error) {
                    reject(error);
                  } else {
                    resolve(fitHXDayData(body));
                  }
            })
        });
    }
}
 
