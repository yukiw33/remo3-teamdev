function getSheet(name){
  const sheetid = PropertiesService.getUserProperties().getProperty("SPREADSHEET_ID");
  return SpreadsheetApp.openById(sheetid).getSheetByName(name);
}

function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;　
}