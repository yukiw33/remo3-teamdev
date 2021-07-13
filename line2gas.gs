// LINEから送信されたデータを処理する関数
function doPost(e) {
  // レスポンスを取得
  const responseLine = e.postData.getDataAsString();
  // JSON形式に変換する
  const responseLineJson = JSON.parse(responseLine).events[0];
  // イベントへの応答に使用するトークンを取得
  const replyToken = responseLineJson.replyToken;
  
  // ポストバックイベントの場合
  if (responseLineJson.type == 'postback') {
    messageController(responseLineJson, replyToken);
  } 
}

// エアコン操作を行う関数
function messageController(event, replyToken) {
  // 操作内容を取得する
  const control = event.postback.data;

  // エアコンを操作する
  doRemo(control);

  const message_list = {
      "on": "エアコンを付けたよ！",
      "off": "エアコンを消したよ！",
      "turn_up": "エアコンの温度を1℃上げたよ！",
      "turn_down": "エアコンの温度を1℃下げたよ！"
    };
  // LINEのメッセージ形式にする
  let LineMessageObject = [{
          'type': 'text',
          'text': message_list[control],
  }];

  // 返信メッセージを送信する
  replyLine(LineMessageObject, replyToken);
}

// LINEに返信する関数
function replyLine(LineMessageObject, replyToken) {
  // LINE BOTのチャネルアクセストークンをプロパティから取得
  const channel_access_token ="Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN");
  const replyHeaders = {
          'Content-Type': 'application/json',
          'Authorization': channel_access_token
  };
  const replyBody = {
          'replyToken': replyToken,
          'messages': LineMessageObject
  };
  const replyOptions = {
          'method': 'POST',
          'headers': replyHeaders,
          'payload': JSON.stringify(replyBody)
  };
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', replyOptions);
}