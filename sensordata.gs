function recordSensorData() {
  const deviceData = getNatureRemoData("devices");　　　　//data取得
  const lastSensorData = getLastData("sensor");　　　　　//最終data取得
  
  var arg = {
    te:deviceData[0].newest_events.te.val,　　//温度
    hu:deviceData[0].newest_events.hu.val,　　//湿度
  }
    
  di=discomfort(arg.te,arg.hu);
  setSensorData(arg, lastSensorData + 1,di);
  if (di>=80){
    gas2line(arg.te,arg.hu,di);
  }
}
function checkSensorData() {
  const deviceData = getNatureRemoData("devices");　　　　//data取得
  const lastSensorData = getLastData("sensor");　　　　　//最終data取得
  
  var arg = {
    te:deviceData[0].newest_events.te.val,　　//温度
    hu:deviceData[0].newest_events.hu.val,　　//湿度
  }
    
  di=discomfort(arg.te,arg.hu);
  gas2line(arg.te,arg.hu,di);
}
function setSensorData(data, row, di) {  
  getSheet('sensor').getRange(row, 1, 1, 4).setValues([[new Date(), data.te, data.hu, di]])
}