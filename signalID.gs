// Signal IDを取得してスプレッドシートに記録する関数
function getSignalIDList() {
  
  // 事前にproperty.gsでプロパティを設定しておく
  const token ="Bearer " + PropertiesService.getUserProperties().getProperty("REMO_ACCESS_TOKEN");  
  const sheet_id = PropertiesService.getUserProperties().getProperty("SHEET_ID_SIGNALS");  
  
  // 機器情報を取得
  const options = {
    "method": "get",
    "headers": {
       "Authorization": token
    }
  };
  const response = UrlFetchApp.fetch("https://api.nature.global/1/appliances", options);
  Logger.log(response)
  r = JSON.parse(response.getContentText())
  //Logger.log(r)
  
  // 書込み用スプレッドシートを開いて、全クリア
  const spreadsheet = SpreadsheetApp.openById(sheet_id);
  const sheet = spreadsheet.getActiveSheet();
  sheet.clear()
  
  const today = new Date();
  sheet.getRange(1, 1).setValue("更新日時");
  sheet.getRange(1, 2).setValue(today);
  
  
  // 取得したデータを解析、スプレッドシートに書き込み
  let rownum = 2
  for (let i=0; i<r.length; i++) {
    const name = r[i]["nickname"]
    if (r[i]["signals"].length !== 0) {
      for (let j=0; j<r[i]["signals"].length; j++) {
        const signal_name = r[i]["signals"][j]["name"]
        const signal_id   = r[i]["signals"][j]["id"]
        
        sheet.getRange(rownum, 1).setValue(name);
        sheet.getRange(rownum, 2).setValue(signal_name);
        sheet.getRange(rownum, 3).setValue(signal_id);
        Logger.log(name+signal_name+signal_id)
        rownum = rownum + 1
      }
    }
  }
}