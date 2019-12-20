/* 受け取ったデータを対象のメモとして編集（更新）する
（表示するページは無く、処理が終わったらトップページにリダイレクトする）*/

var express = require("express");
const fs = require("fs");
var router = express.Router();
const filename = "mydata.txt"; // データファイル名
var message_data = []; // データ

// テキストファイルをロード
function readFromFile(fname) {
  var data = fs.readFileSync(fname, "utf8");
  message_data = data.split("\n");
}

// データを保存
function saveToFile(fname, data_str) {
  fs.writeFile(fname, data_str, err => {
    if (err) {
      throw err;
    }
  });
}

/*-------------
ここから先にこれを書きたい！
1、テキストファイルのデータを読み込む(message_data)
2、message_dataのreq.query.id番目を見つける
3、2で見つけた行をmsgで上書きする  message_data[編集行] = 入力したメッセージ
4、message_dataを再度テキストファイルに書き込む
-------------*/

router.patch("/", (req, res, next) => {
  readFromFile(filename);
  for (var i = 0; i < message_data.length; i++) {
    if (req.body.id == i + 1) {

      var msg = '{"msg":"' + req.body.msg.replace(/[\n\r]/g, "\\n") + '"}'; //改行コードをつなげて1行にする必要がある｡改行コードを置換
      message_data[i] = msg;
      break;
    }
  }

  var message_string = message_data.join("\n");
  saveToFile(filename, message_string);
  res.redirect("/");
});

module.exports = router;