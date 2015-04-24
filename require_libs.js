function requireLibs(callback) {
  var count = 0
  var libs = [
    "a.js",
    "b.js"
  ];
  console.log("(background.js) requiring libs...");

  for (var i = 0; i < libs.length; i += 1) {
    console.log("requiring: " + libs[i]);
    chrome.tabs.executeScript({
      file: libs[i]
    }, function(){
      count += 1;
    });
  }
  checkIfRequired = setInterval(function(){
    if (count == libs.length) {
      console.log("(requireLibs) all libs required.. triggering callback.");
      clearInterval(checkIfRequired);
      callback();
    }

  }, 10)
}