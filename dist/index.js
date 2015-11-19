'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _stores = require('./stores');

var _stores2 = _interopRequireDefault(_stores);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Aux = (function () {
  function Aux(props) {
    _classCallCheck(this, Aux);

    this.validate = props && props.validation ? props.validation : null;
    this.Actions = (0, _actions2.default)(this.validate);
    this.Stores = {};
    this.Store = _stores2.default;
    this.Dispatcher = _dispatcher2.default;
    this.Constants = _constants2.default;
    this.updateValidation = this.updateValidation.bind(this);
    this.addStore = this.addStore.bind(this);
    this.announce = this.announce.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  _createClass(Aux, [{
    key: 'updateValidation',
    value: function updateValidation(props) {
      this.validate = props && props.validation ? props.validation : null;
      this.Actions = (0, _actions2.default)(this.validate);
    }
  }, {
    key: 'addStore',
    value: function addStore(options) {
      var newStore = new _stores2.default(options);
      return { newStore: newStore, aux: this };
    }
  }, {
    key: 'announce',
    value: function announce(action) {
      if (this.Actions[action]) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        _actions2.default[action].apply(_actions2.default, args);
      } else {
        throw new Error('Don\'t see an action named \'' + action + '\' in Aux actions. Check your spelling and verify that you created a config file for that action group.');
      }
    }
  }, {
    key: 'subscribe',
    value: function subscribe(stores) {
      var _this = this;

      stores.forEach(function (config) {
        if (config.store && _this.Stores[config.store]) {
          _this.Stores[config.store].listen(config.event, config.callback);
        }
      });
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(stores) {
      var _this2 = this;

      stores.forEach(function (config) {
        if (config.store && _this2.Stores[config.store]) {
          _this2.Stores[config.store].unlisten(config.event, config.callback);
        }
      });
    }
  }]);

  return Aux;
})();

var test = new Aux();
console.log(test);
exports.default = test;

/** TO DO NOTES:
Aux.dispatch({
  request: {},
  ops: [], // action, store, key, callback
  action: '',
  key: '',
  store: '',
  callback: '',
  serialize: true,
  deserialize: '',
  immutable: '',
  await: '',
  event: '',
  announce: false,
  debug: true,
  validation:
});


Aux.dispatch({
  action: 'BLOG_CREATE_POSTS',
  request: {
    type: 'post',
    url: '',
    data: ''
  }
});

Aux.get('');
Aux.subscribe() //dispatcher, store, event, callback,
Aux.unsubscribe()
*/