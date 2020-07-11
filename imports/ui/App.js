import React from 'react'
import { Meteor } from 'meteor/meteor'

import { accountContainer } from './containers/accountContainer'
import Main from './components/Pages/Main'
import Landing from './components/Pages/Landing'
import Loading from './components/Pages/Loading'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './stylesheets/palette'

import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/app.css'

const App = accountContainer(() => {

    const checkUser = () => {
        if (Meteor.user() === null) {
            return <Landing />
        } else if (Meteor.user() === undefined) {
            return <Loading />
        } else {
            return <Main />
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