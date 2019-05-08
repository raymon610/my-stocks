const crypto = require("crypto");

var express = require('express');
var router = express.Router();
import { createWebAPIRequest, request } from '../util/util';



//获取stock信息
router.get('/getStockInfo', (req, res, next) => {
    const cookie = req.get("Cookie") ? req.get("Cookie") : "";
    createWebAPIRequest(
        "qt.gtimg.cn",
        "/?q="+req.query.q+'&t='+new Date()/1,
        "GET",
        {},
        cookie,
        music_req => res.send(music_req),
        err => res.status(502).send("fetch error")
    );
});

//查询股票信息
router.get('/queryData', (req, res, next) => {
    const cookie = req.get("Cookie") ? req.get("Cookie") : "";
    createWebAPIRequest(
        'smartbox.gtimg.cn',
        '/s3/?v=2&q='+req.query.q+'&t=all',
        'GET',
        {},
        cookie,
        music_req => res.send(music_req),
        err => res.status(502).send("fetch error")
    );
});


export default router
