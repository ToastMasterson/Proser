import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes'
import App from '/imports/ui/App';

import '../imports/startup/accounts-config'
import './main.html'
import 'fontsource-roboto'

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-target'));
});
