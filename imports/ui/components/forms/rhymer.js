import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Datamuse } from '../../../helpers/datamuse'

const Rhymer = () => {
    const [state, setState] = useState({
        wordToRhyme: '',
        relatedWord: '',
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
        let results = await (Datamuse({...state}))
        setState({ ...state, results })
    }

    return (
        <div>
            Find a Rhyme
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="rhymeForm">
                    <Form.Label column sm={2}>Word to Rhyme</Form.Label>
                    <Col sm={10}>
                        <Form.Check inline checked={state.searchType === true} label="Rhymes With" type="radio" onChange={handleRadio} />
                        <Form.Check inline checked={state.searchType !== true} label="Sounds Like" type="radio" onChange={handleRadio} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="rhymeForm">
                    <Form.Label column sm={2}>Word to Rhyme</Form.Label>
                    <Col sm={10}>
                        <Form.Control name="wordToRhyme" type="text" placeholder="Word to Rhyme" onChange={handleChange} />
                    </Col>
                </Form.Group>
                {state.searchType === true
                    ? <Form.Group as={Row} controlId="rhymeForm">
                        <Form.Label column sm={2}>Related Word</Form.Label>
                        <Col sm={10}>
                            <Form.Control name="relatedWord" type="text" placeholder="Related Word" onChange={handleChange} />
                            <Form.Text className="text-muted">Ex. Word to Rhyme: "Coffee" || Relation: "Breakfast"</Form.Text>
                        </Col>
                    </Form.Group>
                    : null
                }
                <Form.Group as={Row} controlId="rhymeForm">
                    <Form.Label column sm={2}>Number of Results</Form.Label>
                    <Col sm={10}>
                        <Form.Control name="numberOfResults" type="number" placeholder="100" onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <Form.Group as={Row} controlId="rhymeForm">
                    <Form.Label column sm={2}>Results</Form.Label>
                    <Col sm={10}>
                        <Form.Control name="results" as="textarea" readOnly value={state.results.map(word => ' ' + word.word)} />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Rhymer