// GETメソッド用
function getNatureRemoData(endpoint) {　　　　　
  const token = "Bearer " + PropertiesService.getUserProperties().getProperty("REMO_ACCESS_TOKEN");  
  const headers = {
    "Content-Type" : "application/json;",
    "Authorization": token,
  };

  const options = {
    "method": "get",
    "headers": headers,
    "muteHttpExceptions" : true
  };
  
  const json = JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
  if (json.message == "Too Many Requests") {
    // APIのリクエスト制限(5分以内で30回まで)を超えたとき(line2gas.gsで例外処理)
      throw "Too Many Requests";
  } else {
      return json;
  }
}

// POSTメソッド用
function postNatureRemoData(endpoint, payload) {
  const token = "Bearer " + PropertiesService.getUserProperties().getProperty("REMO_ACCESS_TOKEN");
  const headers = {
    // Content-Typeは指定しない
    "Authorization": token,
  };

  const options = {
    "method": "post",
    "headers": headers,
    "payload": payload,
    "muteHttpExceptions" : true
  };

  const json = JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
  if (json.message == "Too Many Requests") {
    // APIのリクエスト制限(5分以内で30回まで)を超えたとき(line2gas.gsで例外処理)
      throw "Too Many Requests";
  } else {
      return json;
  }
}