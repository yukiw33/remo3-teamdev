// LINEから送信されたデータを処理する関数
function doPost(e) {
  // レスポンスを取得 */
  const responseLine = e.postData.getDataAsString();
  // JSON形式に変換する
  const responseLineJson = JSON.parse(responseLine).events[0];
  // イベントへの応答に使用するトークンを取得
  const replyToken = responseLineJson.replyToken;
  
  // ポストバックイベントの場合
  if (responseLineJson.type == "postback") {
    if (responseLineJson.postback.data == "change_richmenu") {
      // リッチメニュー切り替えの場合は無視
      ;
    } else {
      messageController(responseLineJson, replyToken);
    }
  } 
}


// エアコン操作を行う関数
function messageController(event, replyToken) {
  try {
    // 操作内容を取得する
    const control = event.postback.data;

    if (control == "check") {
      // 室内環境情報の取得
        var message = checkSensorData();

    } else if (control == "check_settings") {
      // エアコン設定の取得
        var message = checkSettings();

    } else if (control == "set_on_timer" || control == "set_off_timer") {
      // タイマーの設定
        const datetime = event.postback.params.datetime;
        var message = setTriger(datetime, control);

    } else if (control == "change_notice_mode") {
      // 通知モードの設定
        var message = changeNoticeMode();

    } else {
      // エアコンの操作
        var message = controlAircon(control);
    }
  }

  catch(e) {
    if (e == 	"Too Many Requests") {
      var message = "少し時間を置いてから操作してね！";
    } else {
      var message = "エラーが起こってるよ！";
    }
  }

  finally {
    // LINEのメッセージ形式にする
    let LineMessageObject = [{
      "type": "text",
      "text": message,
    }];

    // LINEに返信する
    replyLine(LineMessageObject, replyToken);
  }
}


// LINEに返信する関数
function replyLine(LineMessageObject, replyToken) {
  // LINE BOTのチャネルアクセストークンをプロパティから取得
  const channel_access_token ="Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN");
  const headers = {
    "Content-Type": "application/json",
    "Authorization": channel_access_token
  };
  const postData = {
    "replyToken": replyToken,
    "messages": LineMessageObject
  };
  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
}