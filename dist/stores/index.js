'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var AuxStore = (function (_EventEmitter) {
  _inherits(AuxStore, _EventEmitter);

  function AuxStore(name, privateMethods, listenFor) {
    var _this = this;

    _classCallCheck(this, AuxStore);

    _get(Object.getPrototypeOf(AuxStore.prototype), 'constructor', this).call(this);
    this.data = {};
    this.dispatchToken = _dispatcher2['default'].register(function (action) {
      if (action.actionType) {
        var hiddenMethod = action.actionType.toString().toLowerCase().split(/_/);
        var namespace = '' + hiddenMethod[0];
        if (_this.listenFor.indexOf(namespace.toLowerCase()) > -1) {
          try {
            return _this[hiddenMethod[2]][hiddenMethod[1]](action.payload);
          } catch (e) {
            throw new Error('Method not defined in store');
          }
        }
      }
    });
    this.addPrivateMethods = this.addPrivateMethods.bind(this);
    this.set = this.set.bind(this);
    this.get = this.get.bind(this);

    this.name = name.toLowerCase();
    if (privateMethods) {
      this.addPrivateMethods(privateMethods);
    }
    this.listenFor = listenFor ? listenFor.concat(name.toLowerCase()) : [name.toLowerCase()];
    _index2['default'].addStore[this.name] = this;
  }

  _createClass(AuxStore, [{
    key: 'publish',
    value: function publish(event, args) {
      if (event === undefined) event = 'CHANGE';

      this.emit(event, args);
    }
  }, {
    key: 'listen',
    value: function listen(event, callback) {
      if (event === undefined) event = 'CHANGE';

      this.on(event, callback);
    }
  }, {
    key: 'unlisten',
    value: function unlisten(event, callback) {
      if (event === undefined) event = 'CHANGE';

      this.removeListener(event, callback);
    }
  }, {
    key: 'get',
    value: function get(param) {
      var data = param ? this.data[param] : this.data;
      return data;
    }
  }, {
    key: 'set',
    value: function set(param, data) {
      this.data[param] = data;
    }
  }, {
    key: 'use',
    value: function use(methods) {
      var _this2 = this;

      Object.keys(methods).forEach(function (method) {
        _this2[method] = methods[method];
      });
    }
  }]);

  return AuxStore;
})(_events2['default']);

exports['default'] = AuxStore;
module.exports = exports['default'];
