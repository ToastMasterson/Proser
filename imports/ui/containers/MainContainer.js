import React, { useState, useEffect } from 'react'

import { noteHelper } from '../../helpers/noteHelper'

import Title from './Title'

import ToolForm from '../components/forms/ToolForm'
import Toolbar from '../components/Toolbar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { accountContainer } from './accountContainer'

const MainContainer = accountContainer(({account}) => {

    const defaultNote = {
        _id: null,
        title: "Title",
        content: ""
    }

    const [state, setState] = useState({
        toolType: "",
        notes: account.notes,
        currentNote: account.notes[0] || defaultNote
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
        setState({...state, currentNote: note})
    }
    
    const handleTools = (toolType) => {
        setState({...state, toolType})
    }

    const closeTool = () => {
        setState({...state, toolType: ''})
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

    return ( 
        <Container fluid>
            <Toolbar handleTools={handleTools} saveFile={saveFile} newFile={newFile} />
            <Row>
                <Col sm={2}>
                    <Sidebar notes={state.notes} handleNotes={handleNotes} />
                </Col>
                <Col>
                    {checkTool()}
                    <Title initialTitle={state.currentNote.title} />
                    <Editor initialContent={state.currentNote.content} />
                </Col>
            </Row>
        </Container>
    )
})

export default MainContainer