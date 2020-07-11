import React, { useState, useEffect } from 'react'

import { noteHelper } from '../../../helpers/noteHelper'
import { accountContainer } from '../../containers/accountContainer'
import { checkTool } from '../../../helpers/toolHelper'

import Title from '../Title'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Editor from '../Editor'

import Container from '@material-ui/core/Container'
import { Hidden, Drawer } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { mainStyles } from '../../stylesheets/main'

const defaultNote = {
    _id: null,
    title: "Title",
    content: ""
}

const Main = accountContainer(({account, window}) => {

    const classes = mainStyles()
    const theme = useTheme()

    const [state, setState] = useState({
        toolType: "",
        notes: account.notes,
        currentNote: account.notes[0] || defaultNote,
        mobileOpen: false
    })

    useEffect(() => {
        setState({
            notes: account.notes,
            currentNote: account.notes[0] || defaultNote
        })
    }, [account.notes])


    const saveFile = () => {
        const currentNote = {
            id: state.currentNote._id,
            title: document.getElementById("Title").innerText,
            content: document.getElementsByClassName("ql-editor")[0].innerHTML,
            author: account.userId
        }
        noteHelper(currentNote)
    }

    const newFile = () => {
        setState({...state, currentNote: defaultNote})
    }

    const handleNotes = (note) => {
        setState({...state, currentNote: note, mobileOpen: false})
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
        <Container className={classes.Main} maxWidth="xl">
            <Navbar 
                handleDrawerToggle={handleDrawerToggle} 
                handleTools={handleTools} 
                saveFile={saveFile} 
                newFile={newFile} 
                currentNote={state.currentNote._id}/>
            <nav className={classes.drawer} aria-label="note list">
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={state.mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{paper: classes.drawerPaper}}
                        ModalProps={{keepMounted: true}}>
                        <Sidebar notes={state.notes} handleNotes={handleNotes}/>
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer variant="permanent" open classes={{paper: classes.drawerPaper}}>
                        <Sidebar notes={state.notes} handleNotes={handleNotes}/>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    {checkTool(state.toolType, closeTool)}
                    <Title initialTitle={state.currentNote.title}/>
                    <Editor initialContent={state.currentNote.content}/>
                </div>
            </main>
        </Container>
    )
})

export default Main