import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/app.css'

import Rhymer from './components/forms/Rhymer'
import Editor from './components/Editor';
import Adjectives from './components/forms/Adjectives'
import Toolbar from './components/Toolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './components/Sidebar';
import WordFinder from './components/forms/WordFinder';
import Synonyms from './components/forms/Synonyms';

const App = () => {

  const [state, setState] = useState({
    toolType: ""
  })

  const handleTools = (toolType) => {
    setState({toolType})
  }

  const closeTool = () => {
    setState({toolType: ''})
  }

  const checkTool = () => {
    switch (state.toolType) {
      case 'rhyme':
        return <Rhymer closeTool={closeTool} />
      case 'adj':
        return <Adjectives closeTool={closeTool} />
      case 'finder':
        return <WordFinder closeTool={closeTool} />
      case 'syn':
        return <Synonyms closeTool={closeTool} />
      default:
        break;
    }
  }

  return (
    <div id="App">
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
    </div>
  )
};

export default App