import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from '../../ui/App'
import Landing from '../../ui/components/Pages/Landing'

export const renderRoutes = () => (
    <Router>
        <Route exact path="/" component={App} />
        <Route path="landing" component={Landing} />
    </Router>
)