import React from 'react'
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'

import App from '../../ui/App'
import Landing from '../../ui/components/Landing'

export const renderRoutes = () => (
    <Router>
        <Route exact path="/" component={App} />
        <Route path="landing" component={Landing} />
    </Router>
)