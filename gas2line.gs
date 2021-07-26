// 通知テスト用
function noticeTest() {
  gas2line("30", "70", "80");
}

// 気温、湿度、不快指数を受け取り、LINEに通知
function gas2line(te, hu, di) {
  const channel_access_token = PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN");
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + channel_access_token
  };
  const url = "https://api.line.me/v2/bot/message/broadcast";
  
  if (PropertiesService.getUserProperties().getProperty("AUTO_MODE") == "on" && getSettings().button == "power-off") {
      on("reset");
      var message = "不快指数が80を超えてるよ！\nエアコン付けるね！\n\n【現在の室内】\n　温度　　： " + te + "℃\n　湿度　　： " + hu + "%\n　不快指数： " + di + "\n\n【現在の設定】\n　電源　　　：オン\n　設定モード： " + modeList[getSettings().mode] + "\n　設定温度　： " + getSettings().temp;
  } else if (getSettings().button == "") {
      var message = "不快指数が80を超えてるよ！\nエアコン操作する？\n\n【現在の室内】\n　温度　　： " + te + "℃\n　湿度　　： " + hu + "%\n　不快指数： " + di + "\n\n【現在の設定】\n　電源　　　：オン\n　設定モード： " + modeList[getSettings().mode] + "\n　設定温度　： " + getSettings().temp;
  } else {
      var message = "不快指数が80を超えてるよ！\nエアコン操作する？\n\n【現在の室内】\n　温度　　： " + te + "℃\n　湿度　　： " + hu + "%\n　不快指数： " + di + "\n\n【現在の設定】\n　電源　　　：オフ\n　設定モード： " + modeList[getSettings().mode] + "\n　設定温度　： " + getSettings().temp;
  }
  const postData = {
    "messages": [{
      "type": "text",
      "text": message
    }]
  };
  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(url, options);
}