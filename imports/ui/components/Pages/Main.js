import React, { useState, useEffect } from 'react'

import { Meteor } from 'meteor/meteor'

import { checkTool } from '../helpers/toolHelper'

import Title from '../Title'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Editor from '../Editor'

import Container from '@material-ui/core/Container'
import { Hidden, Drawer } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { mainStyles } from '../../stylesheets/main'

const Main = ({ handleAlert, notebooks, notes, trash, user, window }) => {

    const classes = mainStyles()
    const theme = useTheme()

    const defaultNote = {
        _id: null,
        title: 'Title',
        content: '',
        notebookId: notebooks[0]
    }

    const [state, setState] = useState({
        toolType: '',
        notes: notes,
        notebooks: notebooks,
        trash: trash,
        currentNotebook: notebooks[0],
        currentNote: notes[0] || defaultNote,
        mobileOpen: false
    })

    useEffect(() => {
        setState({
            notes: notes,
            notebooks: notebooks,
            trash: trash,
            currentNote: notes[0] || defaultNote,
            currentNotebook: notebooks[0]
        })
    }, [notes])


    const saveFile = () => {
        if (state.currentNote._id !== null) {
            const currentNote = {
                id: state.currentNote._id,
                title: document.getElementById('Title').innerText,
                content: document.getElementsByClassName('ql-editor')[0].innerHTML,
                notebookId: state.currentNotebook._id
            }
            Meteor.call('notes.updateNote', currentNote, (error, result) => {
                if (error !== undefined) {
                    handleAlert(false, error.reason)
                } else {
                    handleAlert(true, 'Note Saved')
                }
            })
        } else {
            const currentNote = {
                title: document.getElementById('Title').innerText,
                content: document.getElementsByClassName('ql-editor')[0].innerHTML,
                notebookId: state.currentNotebook._id
            }
            Meteor.call('notes.createNewNote', currentNote, (error, result) => {
                if (error !== undefined) {
                    handleAlert(false, error.reason)
                } else {
                    handleAlert(true, 'Note Saved')
                }
            })
        }
        
        
    }

    const newFile = () => {
        const fileTemplate = {
            _id: null,
            title: 'Title',
            content: '',
            notebookId: state.currentNotebook._id
        }
        setState({...state, currentNote: fileTemplate})
    }

    const handleNotes = (note) => {
        setState({...state, currentNote: note, mobileOpen: false})
    }

    const handleNotebooks = (notebook) => {
        setState({ ...state, currentNotebook: notebook, mobileOpen: false})
    }
    
    const handleTools = (toolType) => {
        setState({...state, toolType})
    }

    const closeTool = () => {
        setState({...state, toolType: ''})
    }

    const handleDrawerToggle = () => {
        setState({...state, mobileOpen: !state.mobileOpen})
    }

    const container = window !== undefined ? () => window().document.body : undefined

    return ( 
        <Container className={classes.Main} maxWidth='xl'>
            <Navbar 
                user={user}
                handleDrawerToggle={handleDrawerToggle} 
                handleTools={handleTools} 
                saveFile={saveFile} 
                newFile={newFile} 
                handleAlert={handleAlert}
                currentNote={state.currentNote._id}/>
            <nav className={classes.drawer} aria-label='note list'>
                <Hidden mdUp implementation='css'>
                    <Drawer
                        container={container}
                        variant='temporary'
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={state.mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{paper: classes.drawerPaper}}
                        ModalProps={{keepMounted: true}}>
                        <Sidebar 
                            notebooks={state.notebooks} 
                            trash={state.trash}
                            currentNote={state.currentNote}
                            currentNotebook={state.currentNotebook}
                            handleNotes={handleNotes} 
                            handleNotebooks={handleNotebooks}
                            handleAlert={handleAlert}
                            newFile={newFile} />
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer variant='permanent' open classes={{paper: classes.drawerPaper}}>
                        <Sidebar 
                            notebooks={state.notebooks} 
                            trash={state.trash}
                            currentNote={state.currentNote}
                            currentNotebook={state.currentNotebook}
                            handleNotes={handleNotes} 
                            handleNotebooks={handleNotebooks}
                            handleAlert={handleAlert}
                            newFile={newFile} />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {checkTool(state.toolType, closeTool)}
                <Title initialTitle={state.currentNote.title} />
                <Editor initialContent={state.currentNote.content} />
            </main>
        </Container>
    )
}

export default Main