import React, { useState, useEffect } from 'react'

import { noteHelper } from '../../helpers/noteHelper'
import { accountContainer } from './accountContainer'

import Title from './Title'
import ToolForm from '../components/forms/ToolForm'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from '@material-ui/core/Container'
import { Hidden, Drawer } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { mainStyles } from '../stylesheets/main'

const MainContainer = accountContainer(({account, window}) => {

    const [state, setState] = useState({
        toolType: "",
        notes: account.notes,
        currentNote: account.notes[0] || defaultNote,
        mobileOpen: false
    })

    const defaultNote = {
        _id: null,
        title: "Title",
        content: ""
    }

    const classes = mainStyles()
    const theme = useTheme()

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
        setState({...state, currentNote: note})
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

    const tools = [
        {
            header: 'Rhyme',
            options: ['Rhymes With', 'Sounds Like'],
            searchPhrases: ['Word to Rhyme', 'Word that Sounds Like'],
            placeholder: ['orange', 'jirraf'],
            searchType: 'rhyme'
        }, {
            header: 'Adjective or Noun',
            options: ['Find Adjectives', 'Find Nouns from Adjective'],
            searchPhrases: ['Word to Describe', 'Adjective to Find Noun From'],
            placeholder: ['ocean', 'sticky'],
            searchType: 'adj'
        }, {
            header: 'Word',
            options: ['Use Description', 'Use Association Word'],
            searchPhrases: ['Description or Phrase', 'Association Word'],
            placeholder: ['ringing in the ears', 'cover'],
            searchType: 'finder'
        }, {
            header: 'Synonym or Antonym',
            options: ['Synonyms', 'Antonyms'],
            searchPhrases: ['Search Word', 'Search Word'],
            placeholder: ['happy', 'sad'],
            searchType: 'syn'
        }
    ]

    const checkTool = () => {
        switch (state.toolType) {
            case 'rhyme':
                return <ToolForm closeTool={closeTool} tool={tools[0]} />
            case 'adj':
                return <ToolForm closeTool={closeTool} tool={tools[1]} />
            case 'finder':
                return <ToolForm closeTool={closeTool} tool={tools[2]} />
            case 'syn':
                return <ToolForm closeTool={closeTool} tool={tools[3]} />
            default:
                break;
        }
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    return ( 
        <Container maxWidth="lg">
        <Navbar handleDrawerToggle={handleDrawerToggle} handleTools={handleTools} saveFile={saveFile} newFile={newFile} currentNote={state.currentNote._id} />
            <nav className={classes.drawer} aria-label="note list">
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={state.mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{keepMounted: true}}>
                        <Sidebar notes={state.notes} handleNotes={handleNotes} />
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper }}>
                        <Sidebar notes={state.notes} handleNotes={handleNotes} />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    {checkTool()}
                    <Title initialTitle={state.currentNote.title} />
                    <Editor initialContent={state.currentNote.content} />
                </div>
            </main>
        </Container>
    )
})

export default MainContainer