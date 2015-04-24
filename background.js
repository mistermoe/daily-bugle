var connections = {};
chrome.browserAction.onClicked.addListener(function(tab){
	console.log(tab);
	requireLibs(function(){
		console.log("(background.js) all libs required..");
	});
});

chrome.runtime.onConnect.addListener(function(port){
	console.log("(background.js) client connected on channel " + port.name + ".");

	connections[port.name] = port;
		
	port.onMessage.addListener(function(msg){
		console.log("(background.js) message received!!");
		var receiver;
		for (var channel in connections) {
			if (channel != port.name) {
				receiver = connections[channel];
				receiver.postMessage(msg);
			}
		}
	});
});
