var PrintingPress = {
  // all :  connected (from content-scripts) ports separated by the events they're subscribed to
  connections: {},
  // backgroundChannels : all the channels the background script is subcribed to along with each channel's respective listeners
  backgroundChannels: {},
    
  // print : dispatcher
  print: function() {
    chrome.runtime.onConnect.addListener(function(port){
      port.onMessage.addListener(function(msg){
        if (msg.opts && msg.opts.background) {
          if (PrintingPress.backgroundChannels[msg.publishTo]) {
            for (var i = 0; i < PrintingPress.backgroundChannels[msg.publishTo].length; i += 1) {
              if (msg.args) {
                PrintingPress.backgroundChannels[msg.publishTo][i](msg.args);
              }
              else {
                PrintingPress.backgroundChannels[msg.publishTo][i]();
              }
            }
          }
        }

        else if (msg.subscribeTo) {
          console.log("(PrintingPress.js) client subscribed to " + msg.subscribeTo + ".");;
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
              if (!subscriber) {
                return;
              }
              var response = {
                'channel': msg.publishTo,
                'args': msg.args
              }
              subscriber.postMessage(response);
            })(subscribers[i]);
          }
        }
      });
    });
  },
  // on : background script listener
  on: function(channel, func) {
    if (PrintingPress.backgroundChannels[channel]) {
      PrintingPress.backgroundChannels[channel].push(func)
    }
    else {
      PrintingPress.backgroundChannels[channel] = [func];
    }
  },

  // unsubscribeAll : unsubscribes all listeners
  unsubscribeAll: function() {
    this.connections = {};
    this.backgroundChannels = {};
  },

  unsubscribe: function(opts) {
    if (!opts)
      return;
    if (opts.tabChannels)
      this.connections = {};
    if (opts.backgroundChannels)
      this.backgroundChannels = {};
  },

  publish: function(channel, args, opts) {
    var 
      subscribers = this.connections[channel],
      subscriber;

    for (var i = 0; i < subscribers.length; i += 1) {
      (function(subscriber, channel, args){
        if ( !subscriber ) {
          return;
        }
        var response = {
          'channel' : channel,
          'args': args
        }
        subscriber.postMessage(response);
      })(subscribers[i], channel, args);
    }
  }
}