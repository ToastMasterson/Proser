import React from 'react';
import { Meteor } from 'meteor/meteor'

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/app.css'

import MainContainer from './containers/MainContainer'
import Landing from './components/Landing';
import { accountContainer } from './containers/accountContainer';
import Loading from './components/Loading';
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './stylesheets/palette';

const App = accountContainer(() => {

  const checkUser = () => {
    if (Meteor.user() === null) {
      return <Landing />
    } else if (Meteor.user() === undefined) {
      return <Loading />
    } else {
      return <MainContainer />
    }
  }

  return (
    <div id="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {checkUser() }
      </ThemeProvider>
    </div>
  )
})

export default App