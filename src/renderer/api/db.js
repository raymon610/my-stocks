//调用resolve 或 reject
const fetchStock = function(opts={}){
    let that = this
    let promise = new Promise(function(resolve, reject) {
        //多路排序{createTime: -1, stockCode:1 }
        that.$db.myStocks.find(opts).sort({createTime: -1, stockCode:1 }).exec((err, docs)=> {
            err ? reject(err) : resolve(docs);
        });
    });
    return promise;
}

const getStocksCount = function(opts = {}){
    let that = this
    let promise = new Promise(function(resolve, reject) {
        that.$db.myStocks.count(opts,  (err, count) =>{  
            err ? reject(err) : resolve(count);
        });
    });
    return promise;
}

const addStock = function(stockCode){
    let that = this
    let opts = {
        createTime: new Date(),
        stockCode: stockCode,
        orderNum: 1 //排序的需要手动可以操作
    }
    let promise = new Promise(function(resolve, reject) {
        that.$db.myStocks.insert(opts,  (err, newDoc) =>{
            err ? reject(err) : resolve(newDoc);
        });
    });
    return promise;
}

const delStocks = function(opts = {}){
    let that = this;
    let promise = new Promise(function(resolve, reject) {
        //可删除多条 multi: true
        that.$db.myStocks.remove(opts, { multi: true }, (err, numRemoved) =>{
            err ? reject(err) : resolve(numRemoved);
        });
    });
    return promise;
}

export {
    addStock,
    fetchStock,
    getStocksCount,
    delStocks
}

