import React from 'react';
import { Meteor } from 'meteor/meteor'

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/app.css'

import MainContainer from './containers/MainContainer'
import Landing from './components/Landing';

const App = () => {

  return (
    <div id="App">
      {Meteor.user() === null
        ? <Landing />
        : <MainContainer /> }
    </div>
  )
};

export default App