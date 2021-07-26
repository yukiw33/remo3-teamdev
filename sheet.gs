// スプレッドシートの情報を取得
function getSheet(name){
  const sheetid = PropertiesService.getUserProperties().getProperty("SPREADSHEET_ID");
  return SpreadsheetApp.openById(sheetid).getSheetByName(name);
}

// 最終行を取得
function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;　
}