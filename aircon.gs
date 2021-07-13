// 操作テスト用
function airconTest() {
  doRemo("off");
}

// doRemo()内で使う関数
function getSignalID(control) {
  const signal_id_list = {
    "on": PropertiesService.getUserProperties().getProperty("SIGNAL_ON"),
    "off": PropertiesService.getUserProperties().getProperty("SIGNAL_OFF"),
    "turn_up": PropertiesService.getUserProperties().getProperty("SIGNAL_TURN_UP"),
    "turn_down": PropertiesService.getUserProperties().getProperty("SIGNAL_TURN_DOWN")
  };
  return signal_id_list[control];
}

// line2gas.gsから呼び出す関数
function doRemo(control) {
  // Signal IDを取得
  const signal_id = getSignalID(control);

  const token ="Bearer " + PropertiesService.getUserProperties().getProperty("REMO_ACCESS_TOKEN");
  const options = {
    "method": "post",
    "headers": {
       "Authorization": token
    }
  };
  
  const url = "https://api.nature.global/1/signals/" + signal_id + "/send"
  const response = UrlFetchApp.fetch(url, options);
  return response;
}