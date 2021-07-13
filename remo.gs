function getNatureRemoData(endpoint) {　　　　　
  const token ="Bearer " + PropertiesService.getUserProperties().getProperty("REMO_ACCESS_TOKEN");  
  const headers = {
    "Content-Type" : "application/json;",
    "Authorization": token,
  };

  const options = {
    "method" : "get",
    "headers" : headers,
  };
  
  return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
}