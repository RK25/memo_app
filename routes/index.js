// メモの一覧を表示するページ

var express = require('express');
const fs = require('fs');
var router = express.Router();
const filename = 'mydata.txt'; // データファイル名
var message_data = []; // データ

/* GET home page. */
router.get('/', function (req, res, next) {
  readFromFile(filename);
  res.render('index', {
    title: 'メモアプリ',
    content: message_data,
  });
});

// テキストファイルをロード
function readFromFile(fname) {
  var data = fs.readFileSync(fname, 'utf8');
  message_data = data.split('\n');
  for (var i = 0; i < message_data.length; i++) {};
}

module.exports = router;