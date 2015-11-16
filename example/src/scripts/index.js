import React from 'react';
import ReactDOM from 'react-dom';
import requireDir from 'require-dir';
import Aux from '../../index';
import API from './utils/api';
import AppRoutes from './routes';

// Setup Flux Actions
const actions = requireDir('./actions', {recurse: true});
const buildActions = Object.keys(actions).map((key) => {
  const { globalNamespace, config } = actions[key].default;
  Aux.actions.create(globalNamespace, config);
});
Promise.all(buildActions).then(() => {
  // inititate the app with data by calling an action
  API.init();
});
require('./stores');

ReactDOM.render(<AppRoutes />, document.getElementById('root') );
