var DailyBugle = function() {
  this.port = chrome.runtime.connect();
  this.channels = {};
  this.port.onMessage.addListener(function(response){
    var channelFuncs = this.channels[response.channel];
    for (var i = 0; i < channelFuncs.length; i += 1) {
      (function(func){
        func(response.args);
      })(channelFuncs[i]);
    }
  }.bind(this));

  this.on = function(channel, func) {
    this.port.postMessage({subscribeTo: channel});
    if (this.channels[channel]) {
      this.channels[channel].push(func);
    }
    else {
      this.channels[channel] = [func];
    }
  }

  this.publish = function(channel, args, opts) {
    this.port.postMessage({publishTo: channel, args: args, opts: opts});
  }

}