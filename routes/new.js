// メモの登録フォームを表示するページ

var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    var data = {
        title: 'メモアプリ',
    };
    res.render('new', data);
});

module.exports = router;