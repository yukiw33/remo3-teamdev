// 各自のアクセストークン，スプレッドシートID等を設定するための関数（設定しないものはコメントアウトして実行）
function setUserProperties() {
  /*********************************
    ①入力欄に適切な値を入力して実行する
   *********************************/
  // Nature Remo用のアクセストークンの設定
  PropertiesService.getUserProperties().setProperty("REMO_ACCESS_TOKEN", "Nature Remo用のアクセストークンを入力");
  //リッチメニュー用画像のIDの設定
  PropertiesService.getUserProperties().setProperty("RICH_MENU_IMG1", "richmenu1.pngのIDを入力");
  PropertiesService.getUserProperties().setProperty("RICH_MENU_IMG2", "richmenu2.pngのIDを入力");
  // LINE BOT用のアクセストークンの設定
  PropertiesService.getUserProperties().setProperty("CHANNEL_ACCESS_TOKEN", "LINE BOTのアクセストークンを入力");
  // センサ情報記録用のスプレッドシートIDの設定
  PropertiesService.getUserProperties().setProperty("SPREADSHEET_ID", "記録用のスプレッドシートIDを入力");

  // エアコンのAppliance IDの設定（初期設定ではgetApplianceID()の1つ目のエアコンが紐づけられる）
  id = getApplianceID()[0].id;
  PropertiesService.getUserProperties().setProperty("APPLIANCE_ID", id);
}

// line2gasから呼び出す関数
function changeNoticeMode() {
  if (PropertiesService.getUserProperties().getProperty("AUTO_MODE") == "on") {
    PropertiesService.getUserProperties().setProperty("AUTO_MODE", "off");
    return "自動オンを無効にしたよ！";
  } else if (PropertiesService.getUserProperties().getProperty("AUTO_MODE")==null || PropertiesService.getUserProperties().getProperty("AUTO_MODE")=="off") {
    PropertiesService.getUserProperties().setProperty("AUTO_MODE", "on");
    return "自動オンを有効にしたよ！";
  }
}

// richmenu1.pngのID
// 15bFDQByhsDzEn5KzM9Dy4tSELr2DOVvM

// richmenu2.pngのID
// 1eWVTO8kdBQgWa07YBUzT3FbNAGTcFu6f