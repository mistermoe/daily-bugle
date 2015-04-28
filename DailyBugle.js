var DailyBugle = function() {
	this.port = chrome.runtime.connect();

	this.on = function(channel, func) {
		this.port.postMessage({subscribeTo: channel});
		
		this.port.onMessage.addListener(func);
	}

	this.publish = function(channel, args) {
		this.port.postMessage({publishTo: channel, args: args});
	}
}