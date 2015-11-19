'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FluxDispatcher = require('flux').Dispatcher;
var dispatcher = new FluxDispatcher();

// dispatcher.register( (action) => {
//   console.log(action.actionType);
// });

exports.default = dispatcher;