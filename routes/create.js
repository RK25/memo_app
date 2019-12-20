/* 受け取ったデータをメモとして登録する
（表示するページは無く、処理が終わったらトップページにリダイレクトする）*/

var express = require('express');
const fs = require('fs');
var router = express.Router();
const filename = 'mydata.txt'; // データファイル名
var message_data = []; // データ

// データを保存
function saveToFile(fname, data_str) {
    var data = fs.readFileSync(fname, 'utf8');
    message_data = data.split("\n"); //バックアップメモ：data + data_str; //+ '\n'
    message_data.push(data_str);
    fs.writeFile(fname, message_data.join("\n"), (err) => {
        if (err) {
            throw err;
        }
    });
}

router.post('/', (req, res, next) => {
    var msg = '{"msg":"' + req.body.msg.replace(/[\n\r]/g, "\\n") + '"}'; //改行コードをつなげて1行にする必要がありそう,改行コードを置換
    saveToFile(filename, msg);
    res.redirect('/');
});

module.exports = router;