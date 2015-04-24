console.log("(b.js) connecting to channel b...");
var port = chrome.runtime.connect({name: "b"});

port.onMessage.addListener(function(msg) {
	console.log("(b.js) message received!!!");
	console.log(msg);
});