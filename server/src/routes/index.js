var express = require('express');
var router = express.Router();
const Mongo = require('mongodb-curd');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/api/getData', function(req, res, next) {
    let { limit, skip } = req.query;
    if (!limit || !skip) {
        return res.send({ code: 2, msg: '信息不正确' })
    }
    Mongo.find('yuekao', 'list', (rs) => {
        if (rs) {
            Mongo.find('yuekao', 'list', (result) => {
                if (result) {
                    res.send({ code: 1, data: result })
                } else {
                    res.send({ code: 0, msg: 'error' })
                }
            }, {
                skip: skip,
                limit: limit
            })
        } else {
            res.send({ code: 0, msg: 'error' })
        }
    })
});
router.post('/api/addBill', function(req, res, next) {
    // let { imgH, title, imgs, name } = req.body;
    // if (!imgH || !title || !imgs || !name) {
    //     return res.send({ code: 2, msg: '信息不正确' })
    // }
    Mongo.insert('yuekao', 'list', req.body, (result) => {
        if (result) {
            res.send({ code: 1, data: result })
        } else {
            res.send({ code: 0, msg: 'error' })
        }
    })
});
module.exports = router;