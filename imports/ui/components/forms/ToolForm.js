import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { DMuse } from '../../../helpers/dmuse'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const ToolFormSchema = Yup.object({
    searchWordOrPhrase: Yup.string()
        .matches(/^[a-zA-z]+$/, 'Can only include letters')
        .max(100, 'Entry too long')
        .required('This field is required'),
    relationWord: Yup.string()
        .matches(/^[a-zA-z]+$/, 'Can only include letters')
        .max(30, 'Entry too long'),
    searchType: Yup.bool()
        .required('This field is required'),
    numberOfResults: Yup.number()
        .min(1, 'Must include at least one result')
        .max(100, 'Cannot exceed 100 results')
        .required('This field is required')
})


const ToolForm = ({closeTool, tool}) => {
    const [state, setState] = useState({
        searchType: true,
        results: []
    })

    const initialValues = {
        searchWordOrPhrase: '',
        relationWord: '',
        searchType: true,
        numberOfResults: 100,
    }

    const handleRadio = () => {
        setState({ ...state, searchType: !state.searchType})
    }

    const handleQuery = async (values) => {
        event.preventDefault()
        const query = {...values, searchType: state.searchType}
        console.log(values, query)
        let results = await (DMuse(query, tool.searchType))
        console.log(results)
        setState({ ...state, results })
    }

    return (
        <Container fluid>
            <h2>Find a {tool.header}</h2>
            <Formik validationSchema={ToolFormSchema} onSubmit={values => handleQuery(values)} initialValues={initialValues}>
            {({ handleSubmit, handleChange, touched, errors, isValid, values }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="radio">
                        <Form.Label column sm={2}>Search Type</Form.Label>
                        <Col md={4}>
                            <Form.Check inline 
                                type="radio" 
                                value={true}
                                checked={state.searchType === true} 
                                label={tool.options[0]} 
                                onChange={handleRadio} />
                            <Form.Check inline 
                                type="radio" 
                                value={false}
                                checked={state.searchType !== true} 
                                label={tool.options[1]} 
                                onChange={handleRadio} />
                        </Col>
                        <Col md={{span: 3, offset: 3}}>
                            <Button size="sm" variant="secondary" onClick={closeTool}>Close</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="searchWord">
                        <Form.Label column sm={2}>{state.searchType === true ? tool.searchPhrases[0] : tool.searchPhrases[1]}</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                size="sm" 
                                name="searchWordOrPhrase" 
                                value={values.searchWordOrPhrase}
                                isValid={touched.searchWordOrPhrase && !errors.searchWordOrPhrase}
                                type="text" 
                                placeholder={state.searchType === true ? tool.placeholder[0] : tool.placeholder[1]} 
                                onChange={handleChange} />
                            { errors.searchWordOrPhrase && touched.searchWordOrPhrase ? (<div className="formError">*** {errors.searchWordOrPhrase} ***</div>) : null }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="relationWord">
                            <Form.Label column sm={2}>Relation Word</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    size="sm" 
                                    name="relationWord" 
                                    value={values.relationWord}
                                    isValid={touched.relationWord && !errors.relationWord}
                                    type="text" 
                                    placeholder="Relation Word" 
                                    onChange={handleChange} />
                                { errors.relationWord && touched.relationWord ? (<div className="formError">*** {errors.relationWord} ***</div>) : null }
                                <Form.Text className="text-muted">Optional relation word to sort results by. Ex. "Temperature" yields results sorted by relevance to temperature.</Form.Text>
                            </Col>
                        </Form.Group>
                    <Form.Group as={Row} controlId="numberOfResults">
                        <Form.Label column sm={2}>Number of Results</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                size="sm" 
                                name="numberOfResults" 
                                value={values.numberOfResults}
                                isValid={touched.numberOfResults && !errors.numberOfResults}
                                type="number" 
                                placeholder="100" 
                                onChange={handleChange} />
                            { errors.numberOfResults && touched.numberOfResults ? (<div className="formError">*** {errors.numberOfResults} ***</div>) : null }
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                    <Form.Group as={Row} controlId="submit">
                        <Form.Label column sm={2}>Results</Form.Label>
                        <Col sm={10}>
                            <Form.Control name="results" as="textarea" readOnly 
                                value={state.results.length < 1 
                                    ? 'No results found, try something else!' : state.results.map(word => ' ' + word.word)} />
                        </Col>
                    </Form.Group>
                </Form>
            )}
            </Formik>
        </Container>
    )
}

export default ToolForm