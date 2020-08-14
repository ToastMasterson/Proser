import React from 'react'
import { Meteor } from 'meteor/meteor'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from '../../ui/App'
import Landing from '../../ui/components/Pages/Landing'
import { render } from 'react-dom'

Meteor.startup(() => {
    render (
        <Router>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='landing' component={Landing} />
            </Switch>
        </Router>, 
        document.getElementById('react-target'))
})