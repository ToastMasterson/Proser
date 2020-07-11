import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes'

import '../imports/startup/accounts-config'
import './main.html'
import 'fontsource-roboto/latin-ext.css'
import '../imports/api/links.js'

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-target'));
});
