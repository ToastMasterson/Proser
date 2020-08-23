import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { Notebooks } from '../api/notebooks/notebooks'
import { Notes } from '../api/notes/notes'

import Landing from './components/Pages/Landing'
import Loading from './components/Pages/Loading'
import Main from './components/Pages/Main'
import { Alert } from './components/Alert'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './stylesheets/palette'

import 'bootstrap/dist/css/bootstrap.min.css'


const App = ({ loading, notebooks, notes, user, trash }) => {

    const [state, setState] = useState({
        open: false,
        isSuccess: true,
        message: ''
    })

    const handleAlert = (isSuccess, message) => {
        setState({
            open: true,
            isSuccess,
            message
        })
    }

    const handleClose = () => {
        setState({...state, open: false })
    }

    const checkUser = () => {
        if (Meteor.user() === null) {
            return <Landing handleAlert={handleAlert} />
        } else if (loading) {
            return <Loading />
        } else {
            return <Main notebooks={notebooks} notes={notes} trash={trash} user={user} handleAlert={handleAlert} />
        }
    }

    return (
        <div id='App'>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {checkUser()}
                <Alert open={state.open} handleClose={handleClose} isSuccess={state.isSuccess} message={state.message} />
            </ThemeProvider>
        </div>
    )
}

const userContainer = withTracker((props) => {
    const userHandle = Meteor.subscribe('user')
    const noteHandle = Meteor.subscribe('notes')
    const notebookHandle = Meteor.subscribe('notebooks')
    let notebooks

    if (notebookHandle.ready() && noteHandle.ready()) {
        notebooks = Notebooks.find({}, {sort: { updatedAt: -1 }}).fetch()
        const notes = Notes.find({}, {sort: { updatedAt: -1 }}).fetch()
        notebooks.map(nb => {
            nb.notes = notes.filter(note => note.notebookId === nb._id)
        })
    }

    return {
        loading: !userHandle.ready() || !noteHandle.ready() || !notebookHandle.ready(),
        notebooks: notebooks,
        notes: Notes.find({ isDeleted: false }, {sort: { updatedAt: -1 }}).fetch(),
        trash: Notes.find({ isDeleted: true }, { sort: { updatedAt: -1 }}).fetch(),
        user: Meteor.users.findOne(Meteor.userId())
    }
})(App)

export default userContainer