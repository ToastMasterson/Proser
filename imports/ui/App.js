import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/app.css'

import Rhymer from './components/forms/Rhymer'
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './components/Sidebar';

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

  return (
    <div id="App">
      <Container fluid>
        <Toolbar handleTools={handleTools} />
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col>
            {state.toolType === 'rhyme'
              ? <Rhymer closeTool={closeTool} />
              : null}
            <Editor />
          </Col>
        </Row>
        
      </Container>
    </div>
  )
};

export default App