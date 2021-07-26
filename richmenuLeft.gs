// リッチメニューを作成・更新する関数
function newRichmenu1() {
  deleteOldRichmenu("control");
  richmenuID = makeRichmenu1();
  setImage1(richmenuID);
  
  if (getAliases().find(object => object.richMenuAliasId=="alias-control") != undefined) {
    setAlias1(richmenuID);
  } else {
    makeAlias1(richmenuID);
  }

  setRichmenu(richmenuID);
}

/***************************
  以下 newRichmenu1() の中身
 ***************************/

// リッチメニュー新規作成用の関数
function makeRichmenu1() {
  const url = "https://api.line.me/v2/bot/richmenu";

  const areas = [];

  // 各タップ領域の設定
  areas[0] = {
    // 領域の大きさ
    "bounds": {
      // 左から1250px地点から
      "x": 1250,
      // 上から0px地点から
      "y": 0,
      // 幅1250px
      "width": 1250,
      // 高さ300px
      "height": 300,
    },
    // ユーザがタップ時のアクション
    "action": {
      // リッチメニュー切り替え
      "type": "richmenuswitch",
      // 切り替え先のエイリアスID
      "richMenuAliasId": "alias-others",
      "data": "change_richmenu"
    }
  };

  areas[1] = {
    // 領域の大きさ
    "bounds": {
      // 左から0px地点から
      "x": 0,
      // 上から400px地点から
      "y": 400,
      // 幅1250px
      "width": 1250,
      // 高さ643px
      "height": 643,
    },
    // ユーザがタップ時のアクション
    "action": {
      // ポストバックアクション
      "type": "postback",
      // タップ時にwebhookへ送信される内容
      "data": "on",
      // タップ時にユーザの画面に表示される内容
      "displayText": "エアコンを付けて",
    }
  };

  areas[2] = {
    // 領域の大きさ
    "bounds": {
      // 左から0px地点から
      "x": 0,
      // 上から1043px地点から
      "y": 1043,
      // 幅1250px
      "width": 1250,
      // 高さ643px
      "height": 643,
    },
    // ユーザがタップ時のアクション
    "action": {
      // ポストバックアクション
      "type": "postback",
      // タップ時にwebhookへ送信される内容
      "data": "off",
      // タップ時にユーザの画面に表示される内容
      "displayText": "エアコンを消して",
    }
  };

  areas[3] = {
    // 領域の大きさ
    "bounds": {
      // 左から1250px地点から
      "x": 1250,
      // 上から400px地点から
      "y": 400,
      // 幅1250px
      "width": 1250,
      // 高さ568px
      "height": 568,
    },

    // ユーザがタップ時のアクション
    "action": {
      // ポストバックアクション
      "type": "postback",
      // タップ時にwebhookへ送信される内容
      "data": "turn_up",
      // タップ時にユーザの画面に表示される内容
      "displayText": "1℃上げて",
    }
  };

  areas[4] = {
    // 領域の大きさ
    "bounds": {
      // 左から1250px地点から
      "x": 1250,
      // 上から1168px地点から
      "y": 1168,
      // 幅1250px
      "width": 1250,
      // 高さ568px
      "height": 568,
    },

    // ユーザがタップ時のアクション
    "action": {
      // ポストバックアクション
      "type": "postback",
      // タップ時にwebhookへ送信される内容
      "data": "turn_down",
      // タップ時にユーザの画面に表示される内容
      "displayText": "1℃下げて",
    }
  };

  const postData = {
    //タップ領域全体のサイズ
    "size": {
      // 幅2500px
      "width": 2500,
      // 高さ1686px
      "height": 1686,
    },

    // デフォルトのリッチメニューにするかどうか
    "selected": true,
    // リッチメニュー管理用の名前　ユーザには非公開
    "name": "control",
    // トークルームメニューに表示されるテキスト
    "chatBarText": "リモコン",
    // タップ領域群
    "areas": areas,
  };

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN"),
  };

  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData),
  };

  let json = UrlFetchApp.fetch(url, options);
  json = JSON.parse(json);
  return json.richMenuId;
}


// リッチメニューエイリアス新規作成用の関数
function makeAlias1(richmenuID) {
  const url = "https://api.line.me/v2/bot/richmenu/alias";

  const postData = {
    "richMenuAliasId": "alias-control",
    "richMenuId": richmenuID
  };

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN"),
  };

  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData),
  };

  return JSON.parse(UrlFetchApp.fetch(url, options));
}

// リッチメニューエイリアス更新用の関数
function setAlias1(richmenuID) {
  const url = "https://api.line.me/v2/bot/richmenu/alias/alias-control";

  const postData = {
    "richMenuId": richmenuID
  };

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN"),
  };

  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData),
  };

  return JSON.parse(UrlFetchApp.fetch(url, options));
}


// リッチメニューに画像ファイルを紐づけする関数
function setImage1(richmenuID) {
  const url = "https://api-data.line.me/v2/bot/richmenu/" + richmenuID + "/content";

  // GoogleDriveからファイルIDで画像ファイルを開く
  img_id1= PropertiesService.getUserProperties().getProperty("RICH_MENU_IMG1");
  const image = DriveApp.getFileById(img_id1);

  // 開いた画像ファイルをPNG形式・BLOBに変換
  const blob = image.getAs(MimeType.PNG);

  const headers = {
    "Content-Type": "image/png",
    "Authorization": "Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN"),
  };

  const options = {
    "method": "post",
    "headers": headers,

    // payloadにBLOBをそのまま載せる
    "payload": blob,
  };

  return JSON.parse(UrlFetchApp.fetch(url, options));
}


// デフォルトのリッチメニューを設定する関数
function setRichmenu(richmenuID) {
  const url = "https://api.line.me/v2/bot/user/all/richmenu/" + richmenuID;

  const headers = {
    "Authorization": "Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN"),
  };

  const options = {
    "method": "post",
    "headers": headers,
  };

  return JSON.parse(UrlFetchApp.fetch(url, options));
}