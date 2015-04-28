var dailyBugle = new DailyBugle();

setTimeout(function(){
	dailyBugle.publish("skerp", {selectedElement: "title"});
}, 300);