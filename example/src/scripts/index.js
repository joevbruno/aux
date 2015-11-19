import React from 'react';
import ReactDOM from 'react-dom';
import Aux from '../../index';
import API from './utils/api';
import AppRoutes from './routes';

const actions = {
  blog: require('./actions/blog'),
  stripe: require('./actions/stripe')
};

// Setup Flux Actions
const buildActions = Object.keys(actions).map((key) => {
  const { globalNamespace, config } = actions[key];
  Aux.actions.create(globalNamespace, config);
});
Promise.all(buildActions).then(() => {
  API.init();
});
require('./stores');

ReactDOM.render(<AppRoutes />, document.getElementById('root') );
