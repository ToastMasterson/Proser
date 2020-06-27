import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { DMuse } from '../../../helpers/dmuse'

const Synonyms = ({closeTool}) => {
    const [state, setState] = useState({
        searchWord: '',
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
        let results = await (DMuse({...state}, 'syn'))
        setState({ ...state, results })
    }

    return (
        <Container fluid>
            <h2>Find a Word</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="synonymForm">
                    <Form.Label column sm={2}>Search Type</Form.Label>
                    <Col md={4}>
                        <Form.Check inline checked={state.searchType === true} label="Synonym" type="radio" onChange={handleRadio} />
                        <Form.Check inline checked={state.searchType !== true} label="Antonym" type="radio" onChange={handleRadio} />
                    </Col>
                    <Col md={{span: 3, offset: 3}}>
                        <Button size="sm" variant="secondary" onClick={closeTool}>Close</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="synonymForm">
                    <Form.Label column sm={2}>{state.searchType === true ? 'Synonym' : 'Antonym'}</Form.Label>
                    <Col sm={10}>
                        <Form.Control size="sm" name="searchWord" type="text" 
                            placeholder={state.searchType === true ? 'Synonym' : 'Antonym'} 
                            onChange={handleChange} />
                    </Col>
                </Form.Group>
                    <Form.Group as={Row} controlId="synonymForm">
                        <Form.Label column sm={2}>Relation Word</Form.Label>
                        <Col sm={10}>
                            <Form.Control size="sm" name="relationWord" type="text" placeholder="Relation Word" onChange={handleChange} />
                            <Form.Text className="text-muted">Optional relation word to sort results by. Ex. "Temperature" yields results sorted by relevance to temperature.</Form.Text>
                        </Col>
                    </Form.Group>
                <Form.Group as={Row} controlId="synonymForm">
                    <Form.Label column sm={2}>Number of Results</Form.Label>
                    <Col sm={10}>
                        <Form.Control size="sm" name="numberOfResults" type="number" placeholder="100" onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <Form.Group as={Row} controlId="synonymForm">
                    <Form.Label column sm={2}>Results</Form.Label>
                    <Col sm={10}>
                        <Form.Control name="results" as="textarea" readOnly value={state.results.map(word => ' ' + word.word)} />
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Synonyms