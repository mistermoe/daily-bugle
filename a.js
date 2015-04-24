console.log("(a.js) connecting to chanel a...");
var port = chrome.runtime.connect({name: "a"});

port.onMessage.addListener(function(msg) {
	console.log("(a.js) message received!!!");
	console.log(msg);
});

setTimeout(function(){
	port.postMessage({derp: "skerp"});
}, 100);