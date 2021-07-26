/*************************
  ②リッチメニューを登録する
 *************************/
//リッチメニューのセットアップを行う
function richmenuSetUp(){
  newRichmenu1();
  newRichmenu2();
}

// 作成されたリッチメニューの一覧を取得する関数
function getRichmenus() {
  const url = "https://api.line.me/v2/bot/richmenu/list";

  const headers = {
    "Authorization": "Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN"),
  };

  const options = {
    "method": "get",
    "headers": headers,
  };

  const json = JSON.parse(UrlFetchApp.fetch(url, options)).richmenus;
  console.log(json);
  return json;
}

// 作成されたリッチメニューエイリアスの一覧を取得する関数
function getAliases() {
  const url = "https://api.line.me/v2/bot/richmenu/alias/list";

  const headers = {
    "Authorization": "Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN"),
  };

  const options = {
    "method": "get",
    "headers": headers,
  };

  const json = JSON.parse(UrlFetchApp.fetch(url, options)).aliases;
  console.log(json);
  return json;
}

// リッチメニューを削除する関数
function deleteRichemenu(id) {
  const richmenuID = (id==null)? "richmenu-24e469f686ee5f43b6b48f5b0ee26808":id;
  const url = "https://api.line.me/v2/bot/richmenu/" + richmenuID;

  const headers = {
    "Authorization": "Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN"),
  };

  const options = {
    "method": "delete",
    "headers": headers,
  };

  return JSON.parse(UrlFetchApp.fetch(url, options));
}

// 古いリッチメニューを一括削除する関数
function deleteOldRichmenu(name) {
  var richmenulist = getRichmenus().find(object => object.name==name);
  while (richmenulist != undefined) {
    deleteRichemenu(richmenulist.richMenuId);
    richmenulist = getRichmenus().find(object => object.name==name);
  }
}