var PrintingPress = {
	connections: {},
	print: function() {

		chrome.runtime.onConnect.addListener(function(port){
			console.log("(PrintingPress.js) client connected");

				
			port.onMessage.addListener(function(msg){
				if (msg.subscribeTo) {
					console.log("(PrintingPress.js) client subscribed to " + msg.subscribeTo + ".");
					if (PrintingPress.connections[msg.subscribeTo]) {
						PrintingPress.connections[msg.subscribeTo].push(port);
					}
					else {
						PrintingPress.connections[msg.subscribeTo] = [port];
					}
				}
				else if (msg.publishTo) {
					console.log("(PrintingPress.js) publishing message to " + msg.publishTo);
					var 
						subscribers = PrintingPress.connections[msg.publishTo],
						subscriber;
					for (var i = 0; i < subscribers.length; i += 1) {
						(function(subscriber){
							if (msg.args) {
								subscriber.postMessage(msg.args);
							}
							else {
								subscriber.postMessage(null);
							}
						})(subscribers[i]);
					}
				}
			});
		});
	}
}