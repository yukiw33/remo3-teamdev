// 1時間おきに室内環境を取得しLINEへ通知する関数
function recordSensorData() {
  try {
    const deviceData = getNatureRemoData("devices");    //data取得
    const lastSensorData = getLastData("sensor");       //最終data取得
    
    var arg = {
      te: deviceData[0].newest_events.te.val,   //温度
      hu: deviceData[0].newest_events.hu.val,   //湿度
    }
      
    const di = discomfort(arg.te, arg.hu);       //不快指数
    setSensorData(arg, lastSensorData + 1, di);
    if (di>=80){
      gas2line(arg.te, arg.hu, di.toFixed(1));
    }
  }
  catch(e) {
    if (e == 	"Too Many Requests") {
      // 1分後にもう一度呼び出し
      Utilities.sleep(60000);
      recordSensorData();
    } else {
      ;
    }
  }
}


// 1時間おきに取得した室内環境をスプレッドシートへ記録する関数
function setSensorData(data, row, di) {  
  getSheet("sensor").getRange(row, 1, 1, 4).setValues([[new Date(), data.te, data.hu, di]])
}

// LINEのリッチメニューから室内環境を取得し返信メッセージを返す関数（line2gas.gsで使用）
function checkSensorData() {
  const deviceData = getNatureRemoData("devices");    //data取得
  
  var arg = {
    te: deviceData[0].newest_events.te.val,         //温度
    hu: deviceData[0].newest_events.hu.val,         //湿度
  }
    
  arg.di = discomfort(arg.te, arg.hu).toFixed(1);    //不快指数

  let message = "現在の室内環境は\n　温度　　： " + arg.te + "℃\n　湿度　　： " + arg.hu + "%\n　不快指数： " + arg.di + "\nだよ！\n\n";
    if (arg.di >= 75) {
      message += "熱中症に気をつけて！";
    } else if (60 <= arg.di && arg.di < 75) {
      message += "ちょうどいいね！";
    } else if (arg.di < 60) {
      message += "ちょっと寒いかも？";
    }

  return message;
}