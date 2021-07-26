/************************
  ②Appliance IDを確認する
 ************************/
// エアコンのAppliance IDを確認する関数（model IDやdevice IDと間違えないように注意）
function getApplianceID() {
  const applianceData = getNatureRemoData("appliances");
  const airconData = applianceData.filter(object => object.type=="AC");
  console.log(airconData)
  return airconData
}

// 操作テスト用
function airconTest() {
  try {
    controlAircon("on");
  }
  catch(e) {
    console.log("エラー");
    console.log(e);
  }
}

const modeList = {
  "cool": "冷房",
  "warm": "暖房",
  "dry": "除湿"
};
// エアコンを操作してLINEの返信メッセージを返す関数
function controlAircon(control) {
  switch (control) {
    case "on":
      on();
      return "エアコンを付けたよ！\n\n【現在の設定】\n　設定モード： " + modeList[getSettings().mode] + "\n　設定温度： " + getSettings().temp;
    case "off":
      off();
      return "エアコンを消したよ！";
    case "turn_up":
      const temp1 = turnUp();
      return "エアコンの温度を"　+ temp1 + "℃にしたよ！";
    case "turn_down":
      const temp2 = turnDown();
      return "エアコンの温度を"　+ temp2 + "℃にしたよ！";
    case "change_mode":
      const mode2 = changeMode();
      return "エアコンのモードを" + mode2 + "にしたよ！";
    default:
      console.log("無効な操作です");
  }
}

// エアコン操作のトリガーを設定する関数
function setTriger(datetime, func) {
  const settingTime = new Date(datetime);

  if (settingTime.getTime() < new Date().getTime()) {
    return "その時間には設定できないよ！";
  }
  const control = (func == "set_on_timer")? "on":"off";
  const message = (func == "set_on_timer")? "付けるね！":"消すね！";
  ScriptApp.newTrigger(control).timeBased().at(settingTime).create();
  return (settingTime.getMonth()+1) + "月" + settingTime.getDate() + "日の" + settingTime.getHours() + "時" + settingTime.getMinutes() + "分にエアコンを" + message;
}

// 現在のエアコンの設定を確認する関数
function getSettings() {
  const applianceData = getNatureRemoData("appliances");
  var settings = applianceData.find(object => object.id==PropertiesService.getUserProperties().getProperty("APPLIANCE_ID")).settings;
  console.log(settings);
  return settings;
}

function loop() {
  for (let i=1; i<31; i++) {
    getSettings();
  }
}

function checkSettings() {
  if (settings = getSettings().button == "power-off") {
    return "【現在の設定】\n　電源　　　：オフ\n　設定モード： " + modeList[getSettings().mode] + "\n　設定温度　： " + getSettings().temp;
  } else {
    return "【現在の設定】\n　電源　　　：オン\n　設定モード： " + modeList[getSettings().mode] + "\n　設定温度　： " + getSettings().temp;
  }
}

/****************************
  以下 controlAircon() の中身
 ****************************/

// 電源オン
function on(reset) {
  const endpoint = "appliances/" + PropertiesService.getUserProperties().getProperty("APPLIANCE_ID") + "/aircon_settings";
  
  if (reset=="reset") {
    var payload = {
      "button": "",
      "temperature": "27",
      "operation_mode": "cool"
    }
  } else {
    var payload = {
      "button": "",
    };
  }

  return postNatureRemoData(endpoint, payload);
}

// 電源オフ
function off() {
  const endpoint = "appliances/" + PropertiesService.getUserProperties().getProperty("APPLIANCE_ID") + "/aircon_settings";

  const payload = {
    "button": "power-off",
  };

  return postNatureRemoData(endpoint, payload);
}

// 温度を1度上げる
function turnUp() {
  const endpoint = "appliances/" + PropertiesService.getUserProperties().getProperty("APPLIANCE_ID") + "/aircon_settings";

  const temp = String(parseInt(getSettings().temp) + 1);
  
  const payload = {
    "temperature": (temp<=30)? temp:"30",
  };

  return postNatureRemoData(endpoint, payload).temp;
}

// 温度を1度下げる
function turnDown() {
  const endpoint = "appliances/" + PropertiesService.getUserProperties().getProperty("APPLIANCE_ID") + "/aircon_settings";

  const temp = String(parseInt(getSettings().temp) - 1);
  
  const payload = {
    "temperature": (temp>=16)? temp:"16",
  };

  return postNatureRemoData(endpoint, payload).temp;
}

const modeRotation = ["cool", "dry", "warm"];
// モードを変更する
function changeMode() {
  const endpoint = "appliances/" + PropertiesService.getUserProperties().getProperty("APPLIANCE_ID") + "/aircon_settings";

  const mode = getSettings().mode;
  let index = modeRotation.indexOf(mode) + 1;
  
  const payload = {
    "operation_mode": (index<=2)? modeRotation[index]:modeRotation[0],
  };

  return modeList[postNatureRemoData(endpoint, payload).mode];
}