var connections = {};
chrome.browserAction.onClicked.addListener(function(tab){
	console.log(tab);
	requireLibs(function(){
		console.log("(background.js) all libs required..");
	});
});

PrintingPress.print();