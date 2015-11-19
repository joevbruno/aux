'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = observe;

var _mixinDecorator = require('mixin-decorator');

var _mixinDecorator2 = _interopRequireDefault(_mixinDecorator);

var _aux = require('../../../../aux');

var _aux2 = _interopRequireDefault(_aux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function observe(stores) {
  var listenToStores = {
    componentDidMount: function componentDidMount() {
      _aux2.default.Stores.listen(stores, this.onChange);
    }
  };

  var unlistenToStores = {
    componentWillUnMount: function componentWillUnMount() {
      _aux2.default.Stores.unlisten(stores, this.onChange);
    }
  };

  return (0, _mixinDecorator2.default)(listenToStores, unlistenToStores);
}