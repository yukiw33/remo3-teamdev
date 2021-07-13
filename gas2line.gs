// 通知テスト用（数値は適当）
function noticeTest() {
  gas2line("30", "70", "80");
}

// 気温、湿度、不快指数を受け取り、LINEに通知
function gas2line(te,hu,di) {
  var channel_access_token = PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN");
  var u_id=PropertiesService.getUserProperties().getProperty("USER_ID");
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + channel_access_token
  };
  var url = "https://api.line.me/v2/bot/message/broadcast";
  var postData = {
    "messages": [{
      "type": "text",
      "text": "現在気温:"+te+"\n現在湿度:"+hu+"\n不快指数:"+di
    }]
  };
  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(url, options);
}
