import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { DMuse } from '../../../helpers/dmuse'

const WordFinder = ({closeTool}) => {
    const [state, setState] = useState({
        description: '',
        relationWord: '',
        searchType: true,
        numberOfResults: 100,
        results: []
    })

    const handleChange = () => {
        event.target.name === 'numberOfResults'
            ? setState({ ...state, [event.target.name]: +event.target.value})
            : setState({ ...state, [event.target.name]: event.target.value})
    }

    const handleRadio = () => {
        setState({ ...state, searchType: !state.searchType})
    }

    const handleSubmit = async () => {
        event.preventDefault()
        let results = await (DMuse({...state}, 'finder'))
        setState({ ...state, results })
    }

    return (
        <Container fluid>
            <h2>Find a Word</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="finderForm">
                    <Form.Label column sm={2}>Search Type</Form.Label>
                    <Col md={4}>
                        <Form.Check inline checked={state.searchType === true} label="Use a Description" type="radio" onChange={handleRadio} />
                        <Form.Check inline checked={state.searchType !== true} label="Use an Association" type="radio" onChange={handleRadio} />
                    </Col>
                    <Col md={{span: 3, offset: 3}}>
                        <Button size="sm" variant="secondary" onClick={closeTool}>Close</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="finderForm">
                    <Form.Label column sm={2}>{state.searchType === true ? 'Description' : 'Association Word'}</Form.Label>
                    <Col sm={10}>
                        <Form.Control size="sm" name="description" type="text" 
                            placeholder={state.searchType === true ? 'Description' : 'Association Word'} 
                            onChange={handleChange} />
                    </Col>
                </Form.Group>
                    <Form.Group as={Row} controlId="finderForm">
                        <Form.Label column sm={2}>Relation Word</Form.Label>
                        <Col sm={10}>
                            <Form.Control size="sm" name="relationWord" type="text" placeholder="Relation Word" onChange={handleChange} />
                            <Form.Text className="text-muted">Optional relation word to sort results by. Ex. "Temperature" yields results sorted by relevance to temperature.</Form.Text>
                        </Col>
                    </Form.Group>
                <Form.Group as={Row} controlId="finderForm">
                    <Form.Label column sm={2}>Number of Results</Form.Label>
                    <Col sm={10}>
                        <Form.Control size="sm" name="numberOfResults" type="number" placeholder="100" onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <Form.Group as={Row} controlId="finderForm">
                    <Form.Label column sm={2}>Results</Form.Label>
                    <Col sm={10}>
                        <Form.Control name="results" as="textarea" readOnly value={state.results.map(word => ' ' + word.word)} />
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default WordFinder