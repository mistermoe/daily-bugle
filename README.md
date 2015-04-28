DailyBugle
==========

**a pub/sub library for chrome extensions**


----------
## Description ##
I wrote this pub/sub library for a work project whose name is something related to spider man.. so DailyBugle seemed suiting.
http://www.spiderfan.org/comics/images/daily_bugle_props/001.jpg

It can be used in any chrome extension. Just follow the installation instructions below. I've also added an example chrome extension under the example directory if you want to see it work. Otherwise just check out the usage section.

an example use case would be if you need to communicate between  multiple content scripts (or just scripts interacting with the DOM) in order to update what they're displaying based on an action that occurred somewhere else.

----------


Installation
------------
```
bower install daily-bugle
```
or 
```
git clone https://github.com/mistermoe/daily-bugle
```

add PrintingPress.js to your manifest.json under background scripts
```
"background": {
    "scripts": [
        "PrintingPress.js",
		"other_background_scripts.js"
    ],
    "persistent": false
}
```
add DailyBugle.js to your manifest.json under content scripts 
```
  "content_scripts": [
    {
      "matches": ["http://*"],
      "js": ["DailyBugle.js"]
    }
  ]
```
OR 
execute the file on the front end from a background script. (i recommend this because content scripts are executed on any url that matches the pattern defined under the matches property regardless of if your extension is turned on)
```
chrome.tabs.executeScript({
  file: "PrintingPress.js"
});
```

then in a background script
```
PrintingPress.print();
```

----------
## Usage ##
**publishing**
```
var dailyBugle = new DailyBugle();

dailyBugle.publish(
	"Spiderman. Hero or Villain?",
	{optional: "arguments sent to subscribers"}
);
```
**subscribing**
```
var dailyBugle = new DailyBugle();

dailyBugle.on(
	"Spiderman. Hero or Villain?",
	function(msg){
		console.log("listener triggered.");
		console.log(msg);
	}
);
```


----------
## Example ##
check out the example chrome extension i've added in the example directory. Make sure to copy DailyBugle.js and PrintingPress.js into the example directory if you plan on actually loading the example as a chrome extension. I've added log messages in to help you see how it works.