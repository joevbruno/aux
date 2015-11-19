import React from 'react';
import { Router, Route } from 'react-router';
import App from '../components';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
       <Route path="/" component={App} />
      </Router>
    );
  }
}
