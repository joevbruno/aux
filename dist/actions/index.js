'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _dispatcher = require('../dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _actions = {};

function capitalize(string) {
  return string.toLowerCase().replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
}

function AuxActions(validation) {
  var isValid = undefined;
  if (validation && typeof validation === 'function') {
    isValid = validation;
  } else {
    isValid = function () {
      return true;
    };
  }
  return {
    get: function get() {
      return _actions;
    },
    set: function set(globalNamespace, config) {
      var assembledActions = config.map(function (item) {
        var _namespace = item.namespace;
        var actions = item.actions;
        return actions.map(function (action) {
          var uncapitalizedAction = action.toLowerCase();
          var camelLocalNamespace = capitalize(_namespace);
          var camelGlobalNamespace = capitalize(globalNamespace);
          return {
            name: '' + uncapitalizedAction + camelLocalNamespace + camelGlobalNamespace,
            key: globalNamespace + '_' + action + '_' + _namespace
          };
        });
      });

      return Promise.resolve(assembledActions).then(function (nonFlattedActions) {
        return nonFlattedActions.reduce(function (a, b) {
          return a.concat(b);
        }, []);
      }).then(function (flattedActions) {
        return flattedActions.forEach(function (item) {
          _constants2.default[item.key] = item.key;
          var type = item.key.toString();
          var dispatchAction = function dispatchAction(payload, doValidation, checkStatus) {
            var runValidation = doValidation === false ? false : true;

            if (checkStatus && checkStatus(type, payload) && runValidation && isValid(type, payload)) {
              _dispatcher2.default.dispatch({
                actionType: type,
                payload: payload
              });
            } else if (!checkStatus && runValidation && isValid(type, payload)) {
              _dispatcher2.default.dispatch({
                actionType: type,
                payload: payload
              });
            } else if (runValidation && !isValid(type, payload)) {
              _dispatcher2.default.dispatch({
                actionType: 'ERROR_VALIDATION_ERROR',
                payload: payload
              });
            } else if (checkStatus && !checkStatus(type, payload)) {
              _dispatcher2.default.dispatch({
                actionType: 'ERROR_STATUS_ERROR',
                payload: payload
              });
            } else if (!checkStatus && !doValidation) {
              _dispatcher2.default.dispatch({
                actionType: type,
                payload: payload
              });
            } else {
              return _dispatcher2.default.dispatch({
                actionType: 'ERROR_UNKNOWN_ERROR',
                payload: payload
              });
            }
          };
          _actions[item.name] = dispatchAction;
        });
      }).catch(function (err) {
        var payload = err;
        return _dispatcher2.default.dispatch({
          actionType: 'ERROR_UNKNOWN_ERROR',
          payload: payload
        });
      });
    }
  };
}

exports.default = AuxActions;