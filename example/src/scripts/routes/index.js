import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../components';
import Tasks from '../components/sections/tasks';
import Browser from '../components/sections/browser';
import Docs from '../components/sections/docs';
import Versions from '../components/sections/versions';
import Subversion from '../components/sections/subversion';
import Git from '../components/sections/git';
import Activity from '../components/sections/activity';
import Rally from '../components/sections/rally';
import Slack from '../components/sections/slack';
import Contacts from '../components/sections/contacts';
import Settings from '../components/sections/settings';
import Config from '../components/sections/config';
import About from '../components/sections/about';
import NewTask from '../components/sections/new_task';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
       <Route path="/" component={App}>
        <IndexRoute component={Tasks} />
        <Route path="browsers" component={Browser} />
        <Route path="docs" component={Docs} />
        <Route path="versions" component={Versions} >
          <Route path="subversion" component={Subversion} />
          <Route path="git" component={Git} />
        </Route>
        <Route path="activity" component={Activity} >
          <Route path="rally" component={Rally} />
          <Route path="slack" component={Slack} />
          <Route path="contacts" component={Contacts} />
        </Route>
        <Route path="settings" component={Settings}>
          <Route path="config" component={Config} />
          <Route path="about" component={About} />
        </Route>
        <Route path="new" component={NewTask} />
       </Route>
      </Router>
    );
  }
}
