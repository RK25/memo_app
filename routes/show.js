// 1つのメモを表示するページ（URLからIDを取得する）

var express = require('express');
const fs = require('fs');
var router = express.Router();
const filename = 'mydata.txt'; // データファイル名
var message_data = []; // データ
var searched_message;

/* GET show page. */
router.get('/', (req, res, next) => {
    readFromFile(filename);
    for (var i = 0; i < message_data.length; i++) {
        if (req.query.id == i + 1) {
            searched_message = JSON.parse(message_data[i]);
            break;

        }
    }

    res.render('show', {
        title: 'メモアプリ',
        content: searched_message,
        id: req.query.id,
    });
});

// テキストファイルをロード
function readFromFile(fname) {
    var data = fs.readFileSync(fname, 'utf8');
    message_data = data.split('\n');
}

module.exports = router;