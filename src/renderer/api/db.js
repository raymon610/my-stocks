import db from '../utils/nedb'
Vue.prototype.$db = db.db

//加载
this.$db.myStocks.loadDatabase();
this.$db.myStocks.find({},  (err, docs)=> {
    console.log(docs);
    if(docs && docs.length > 0){
        this.totalOptionList = docs;
    }
});


const fetchStock = function(){
    return this.$db.myStocks.find({},  (err, docs)=> {
        console.log(docs);
        if(docs && docs.length > 0){
            this.totalOptionList = docs;
        }
    });
}

const addStock = function(stockCode){
    var opts = {
        createTime: new Date(),
        stockCode: stockCode,
        orderNum: 1 //排序的需要手动可以操作
    }
    this.$db.myStocks.insert(opts, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        console.log(newDoc);
    });
        
}
export {
    addStock,
    fetchStock
}

