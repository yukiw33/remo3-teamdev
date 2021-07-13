// リッチメニュー作成用の関数
function makeRichmenu() {
  const channel_access_token ="Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN");
  const url = 'https://api.line.me/v2/bot/richmenu';

  const areas = [];

  // 各タップ領域の設定
  areas[0] = {

    // 領域の大きさ
    'bounds': {

      // 左から0px地点から
      'x': 0,

      // 上から0px地点から
      'y': 0,

      // 幅1250px
      'width': 1250,

      // 高さ843px
      'height': 843,
    },

    // ユーザがタップ時のアクション
    'action': {
      // ポストバックアクション
      'type': 'postback',

      // タップ時にwebhookへ送信される内容
      'data': 'on',

      // タップ時にユーザの画面に表示される内容
      'displayText': 'エアコンを付けて',
    }
  };

  areas[1] = {

    // 領域の大きさ
    'bounds': {

      // 左から0px地点から
      'x': 0,

      // 上から844px地点から
      'y': 844,

      // 幅1250px
      'width': 1250,

      // 高さ843px
      'height': 843,
    },

    // ユーザがタップ時のアクション
    'action': {
      // ポストバックアクション
      'type': 'postback',

      // タップ時にwebhookへ送信される内容
      'data': 'off',

      // タップ時にユーザの画面に表示される内容
      'displayText': 'エアコンを消して',
    }
  };

  areas[2] = {

    // 領域の大きさ
    'bounds': {

      // 左から1251px地点から
      'x': 1251,

      // 上から0px地点から
      'y': 0,

      // 幅1250px
      'width': 1250,

      // 高さ713px
      'height': 713,
    },

    // ユーザがタップ時のアクション
    'action': {
      // ポストバックアクション
      'type': 'postback',

      // タップ時にwebhookへ送信される内容
      'data': 'turn_up',

      // タップ時にユーザの画面に表示される内容
      'displayText': '1℃上げて',
    }
  };

  areas[3] = {

    // 領域の大きさ
    'bounds': {

      // 左から1251px地点から
      'x': 1251,

      // 上から974px地点から
      'y': 974,

      // 幅1250px
      'width': 1250,

      // 高さ713px
      'height': 713,
    },

    // ユーザがタップ時のアクション
    'action': {
      // ポストバックアクション
      'type': 'postback',

      // タップ時にwebhookへ送信される内容
      'data': 'turn_down',

      // タップ時にユーザの画面に表示される内容
      'displayText': '1℃下げて',
    }
  };

  const postData = {

    //タップ領域全体のサイズ
    'size': {

      // 幅2500pxで
      'width': 2500,

      // 高さ1686pxで
      'height': 1686,
    },

    // デフォルトのリッチメニューにするかどうか
    'selected': true,

    // リッチメニュー管理用の名前　ユーザには非公開
    'name': 'aircon',

    // トークルームメニューに表示されるテキスト
    'chatBarText': "リモコン",

    // タップ領域群
    'areas': areas,
  };

  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': channel_access_token,
  };

  const options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData),
  };

  let json = UrlFetchApp.fetch(url, options);
  json = JSON.parse(json);
  return json.richMenuId;
}

// リッチメニューに画像ファイルを紐づけする関数
function setImage_Richmenu(richmenuID) {
  const channel_access_token ="Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN");
  const url = 'https://api-data.line.me/v2/bot/richmenu/' + richmenuID + '/content';

  // GoogleDriveからファイルIDで画像ファイルを開く
  const image = DriveApp.getFileById("1YJ8JlUlv3PTcElO7PkkpCuPnXtD3r1HQ");

  // 開いた画像ファイルをPNG形式・BLOBに変換
  const blob = image.getAs(MimeType.PNG);

  const headers = {
    'Content-Type': 'image/png',
    'Authorization': channel_access_token,
  };

  const options = {
    'method': 'post',
    'headers': headers,

    // payloadにBLOBをそのまま載せる
    'payload': blob,
  };

  let json = UrlFetchApp.fetch(url, options);
  json = JSON.parse(json);
  return json;
}

// デフォルトのリッチメニューを設定する関数（これを実行する）
function setRichmenu() {
  const channel_access_token ="Bearer " + PropertiesService.getUserProperties().getProperty("CHANNEL_ACCESS_TOKEN");
  // リッチメニューを作成してリッチメニューIDを取得
  const richmenuID = makeRichmenu();
  // リッチメニューに使う画像をセット
  setImage_Richmenu(richmenuID);
  const url = 'https://api.line.me/v2/bot/user/all/richmenu/' + richmenuID;

  const headers = {
    'Authorization': channel_access_token,
  };

  const options = {
    'method': 'post',
    'headers': headers,
  };

  let json = UrlFetchApp.fetch(url, options);
  json = JSON.parse(json);
  return json;
}