import React, { useState } from 'react'
import ToolForm from '../components/forms/ToolForm'
import Toolbar from '../components/Toolbar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const MainContainer = () => {

    const [state, setState] = useState({
        toolType: ""
    })
    
    const handleTools = (toolType) => {
        setState({toolType})
    }

    const closeTool = () => {
        setState({toolType: ''})
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
            <Toolbar handleTools={handleTools} />
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col>
                    {checkTool()}
                    <Editor />
                </Col>
            </Row>
        </Container>
    )
}

export default MainContainer