import React, { useState } from 'react'

import * as Yup from 'yup'
import { DMuse } from '../helpers/dmuse'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import { 
    Button, 
    Backdrop, 
    Fade, 
    Modal, 
    Grid,
    Container, 
    Typography, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    RadioGroup,
    Radio,
    FormControlLabel} from '@material-ui/core'

import { modalStyles } from '../../stylesheets/modal'

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
        results: [],
        expanded: 'panel1'
    })

    const classes = modalStyles()

    const initialValues = {
        searchWordOrPhrase: '',
        relationWord: '',
        searchType: true,
        numberOfResults: 100,
    }

    const handlePanel = (panel) => (event, newExpanded) => {
        setState({...state, expanded: newExpanded ? panel : false})
    }

    const handleRadio = () => {
        setState({ ...state, searchType: !state.searchType})
    }

    const handleQuery = async (values) => {
        event.preventDefault()
        const query = {...values, searchType: state.searchType}
        let results = await (DMuse(query, tool.searchType))
        setState({ ...state, results, expanded: 'panel2' })
    }

    return (
        <Modal
            open
            onClose={closeTool}
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
            className={classes.modal}
        >
            <Fade in>
                <div className={classes.modalPaper}>
                <Accordion 
                    classes={{root: classes.expansionPanel, disabled: classes.disabled}} 
                    square 
                    expanded={state.expanded === 'panel1'} 
                    onChange={handlePanel('panel1')} 
                    disabled={state.expanded === 'panel1'} >
                    <AccordionSummary classes={{root: classes.panelSummary, disabled: classes.disabled}}>
                        <Typography variant='h5'>
                            Find a {tool.header}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails classes={{root: classes.panelContent}}>
                    <Container className={classes.toolForm}>
                        <Formik 
                            validationSchema={ToolFormSchema} 
                            onSubmit={values => handleQuery(values)} 
                            initialValues={initialValues}>
                            {({ submitForm }) => (
                                <Form>
                                    <Field component={RadioGroup} name='searchType' onChange={handleRadio}>
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio checked={state.searchType} />}
                                            label={tool.options[0]}
                                            labelPlacement='start' />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio checked={!state.searchType} />}
                                            label={tool.options[1]}
                                            labelPlacement='start' />
                                    </Field>
                                    <Field
                                        component={TextField}
                                        size='small' 
                                        name='searchWordOrPhrase' 
                                        label={ state.searchType === true ? tool.searchPhrases[0] : tool.searchPhrases[1] }
                                        type='text' 
                                        placeholder={state.searchType === true ? tool.placeholder[0] : tool.placeholder[1]} />
                                    <Field
                                        component={TextField}
                                        size='small' 
                                        label='Relation Word'
                                        helperText={`Optional relation word to sort results by. Ex. 'Temperature' yields results sorted by relevance to temperature.`}
                                        name='relationWord' 
                                        type='text' 
                                        placeholder='Relation Word' />
                                    <Field
                                        component={TextField}
                                        label='Number of Results'
                                        size='small' 
                                        name='numberOfResults' 
                                        type='number' 
                                        placeholder='100' />
                                    <Button color='primary' variant='contained' type='submit' onClick={submitForm} size='small'>Submit</Button>
                                </Form>
                            )}
                        </Formik>
                    </Container>
                    </AccordionDetails>
                    </Accordion>
                    <Accordion classes={{root: classes.expansionPanel, disabled: classes.disabled}} square expanded={state.expanded === 'panel2'} onChange={handlePanel('panel2')} disabled={state.expanded === 'panel2'}>
                        <AccordionSummary classes={{root: classes.panelSummary, disabled: classes.disabled}}>
                            <Typography variant='h5'>Results</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.panelContent}>
                            <Container maxWidth='sm'>
                                <Typography variant='body2'>
                                    {state.results.length < 1 
                                        ? 'No results found, try something else!' : state.results.map(word => ' ' + word.word) }
                                </Typography>
                            </Container>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Fade>
            
        </Modal>
    )
}

export default ToolForm