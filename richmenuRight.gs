// リッチメニューを作成・更新する関数
function newRichmenu2() {
  deleteOldRichmenu("others");
  richmenuID = makeRichmenu2();
  setImage2(richmenuID);
  
  if (getAliases().find(object => object.richMenuAliasId=="alias-others") != undefined) {
    setAlias2(richmenuID);
  } else {
    makeAlias2(richmenuID);
  }
}

/***************************
  以下 newRichmenu2() の中身
 ***************************/

// リッチメニュー新規作成用の関数
function makeRichmenu2() {
  const url = "https://api.line.me/v2/bot/richmenu";

  const areas = [];

  // 各タップ領域の設定
  areas[0] = {
    // 領域の大きさ
    "bounds": {
      // 左から0px地点から
      "x": 0,
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
      "richMenuAliasId": "alias-control",
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
      // 幅833px
      "width": 833,
      // 高さ643px
      "height": 643,
    },
    // ユーザがタップ時のアクション
    "action": {
      // ポストバックアクション
      "type": "postback",
      // タップ時にwebhookへ送信される内容
      "data": "check",
      // タップ時にユーザの画面に表示される内容
      "displayText": "現在の室内環境を教えて",
    }
  };

  areas[2] = {
    // 領域の大きさ
    "bounds": {
      // 左から0px地点から
      "x": 0,
      // 上から1043px地点から
      "y": 1043,
      // 幅833px
      "width": 833,
      // 高さ643px
      "height": 643,
    },
    // ユーザがタップ時のアクション
    "action": {
      // ポストバックアクション
      "type": "postback",
      // タップ時にwebhookへ送信される内容
      "data": "check_settings",
      // タップ時にユーザの画面に表示される内容
      "displayText": "現在のエアコン設定を教えて",
    }
  };

  areas[3] = {
    // 領域の大きさ
    "bounds": {
      // 左から833px地点から
      "x": 833,
      // 上から400px地点から
      "y": 400,
      // 幅834px
      "width": 834,
      // 高さ643px
      "height": 643,
    },
    // ユーザがタップ時のアクション
    "action": {
      // ポストバックアクション
      "type": "postback",
      // タップ時にwebhookへ送信される内容
      "data": "change_mode",
      // タップ時にユーザの画面に表示される内容
      "displayText": "運転モードを変更して",
    }
  };

  areas[4] = {
    // 領域の大きさ
    "bounds": {
      // 左から833px地点から
      "x": 833,
      // 上から1043px地点から
      "y": 1043,
      // 幅834px
      "width": 834,
      // 高さ643px
      "height": 643,
    },
    // ユーザがタップ時のアクション
    "action": {
      // ポストバックアクション
      "type": "postback",
      // タップ時にwebhookへ送信される内容
      "data": "change_notice_mode",
      // タップ時にユーザの画面に表示される内容
      "displayText": "通知モードを変更して",
    }
  };

  areas[5] = {
    // 領域の大きさ
    "bounds": {
      // 左から1667px地点から
      "x": 1667,
      // 上から400px地点から
      "y": 400,
      // 幅833px
      "width": 833,
      // 高さ643px
      "height": 643,
    },
    // ユーザがタップ時のアクション
    "action": {
      // 日時選択アクション
      "type": "datetimepicker",
      // タップ時にwebhookへ送信される内容
      "data": "set_on_timer",
      // 選択モード
      "mode": "datetime",
    }
  };

  areas[6] = {
    // 領域の大きさ
    "bounds": {
      // 左から1667px地点から
      "x": 1667,
      // 上から1043px地点から
      "y": 1043,
      // 幅833px
      "width": 833,
      // 高さ643px
      "height": 643,
    },
    // ユーザがタップ時のアクション
    "action": {
      // 日時選択アクション
      "type": "datetimepicker",
      // タップ時にwebhookへ送信される内容
      "data": "set_off_timer",
      // 選択モード
      "mode": "datetime",
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
    "selected": false,
    // リッチメニュー管理用の名前 ユーザには非公開
    "name": "others",
    // トークルームメニューに表示されるテキスト
    "chatBarText": "その他",
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
function makeAlias2(richmenuID) {
  const url = "https://api.line.me/v2/bot/richmenu/alias";

  const postData = {
    "richMenuAliasId": "alias-others",
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
function setAlias2(richmenuID) {
  const url = "https://api.line.me/v2/bot/richmenu/alias/alias-others";

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


// リッチメニューに画像ファイルを紐付けする関数
function setImage2(richmenuID) {
  const url = "https://api-data.line.me/v2/bot/richmenu/" + richmenuID + "/content";

  // GoogleDriveからファイルIDで画像ファイルを開く
  img_id2= PropertiesService.getUserProperties().getProperty("RICH_MENU_IMG2");
  const image = DriveApp.getFileById(img_id2);

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