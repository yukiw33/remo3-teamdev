// 各自のアクセストークン・スプレッドシートIDを設定するための関数
function setToken() {
  // Nature Remo用のアクセストークンの設定
  PropertiesService.getUserProperties().setProperty("REMO_ACCESS_TOKEN", "Nature Remo用のアクセストークンを入力");
  // LINE BOT用のアクセストークンの設定
  PropertiesService.getUserProperties().setProperty("CHANNEL_ACCESS_TOKEN", "LINE BOTのアクセストークンを入力");
  // Signal ID用のスプレッドシートIDの設定
  PropertiesService.getUserProperties().setProperty("SHEET_ID_SIGNALS", "Signal ID用のスプレッドシートIDを入力");
  // センサ情報記録用のスプレッドシートIDもここで設定できるようにするといいかも
  PropertiesService.getUserProperties().setProperty("SPREADSHEET_ID", "記録用のスプレッドシートIDを入力");

}


// 各自のSignal IDを設定するための関数
function setSignalID() {
  // on
  PropertiesService.getUserProperties().setProperty("SIGNAL_ON", "オンにするSignal IDを入力");
  // off
  PropertiesService.getUserProperties().setProperty("SIGNAL_OFF", "オフにするSignal IDを入力");
  // turn_up
  PropertiesService.getUserProperties().setProperty("SIGNAL_TURN_UP", "温度を1度上げるSignal IDを入力");
  // turn_down
  PropertiesService.getUserProperties().setProperty("SIGNAL_TURN_DOWN", "温度を1度下げるSignal IDを入力");
}