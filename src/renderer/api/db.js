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