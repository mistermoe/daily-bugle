var dailyBugle = new DailyBugle();

dailyBugle.on("skerp", function(msg){
	console.log("(b.js) message!!!");
	console.log(msg);
})