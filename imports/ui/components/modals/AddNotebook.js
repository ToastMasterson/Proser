import React from 'react'

import { Meteor } from 'meteor/meteor'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import { modalStyles } from '../../stylesheets/modal'
import Form from 'react-bootstrap/Form'

const addNotebookSchema = Yup.object({
    title: Yup.string()
        .max(25, 'Entry too long')
        .min(1, 'Must include at least one character')
        .required('This field is required')
})

const AddNotebook = ({show, handleModalClose}) => {
    const classes = modalStyles()

    const initialValues = {
        title: ''
    }
    
    const handleAddNotebook = (values) => {
        event.preventDefault()
        console.log(values)
        Meteor.call('notebooks.addNewNotebook', values, (error, response) => {
            if (error !== undefined) {
                console.log(error)
            } else {
                console.log(response)
            }
        })

    }

    return (
        <Modal
            open={show}
            onClose={handleModalClose}
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
            className={classes.modal}>
            <Fade in={show}>
                <div className={classes.modalPaper}>
                    <Typography variant='h3'>Add a new notebook</Typography>
                    <Formik validationSchema={addNotebookSchema} onSubmit={values => handleAddNotebook(values)} initialValues={initialValues}>
                        {({ handleSubmit, handleChange, touched, errors, isValid, values }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId='title'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control 
                                        name='title' 
                                        value={values.title}
                                        isValid={touched.title && !errors.title}
                                        type='text'
                                        placeholder='New Notebook'
                                        onChange={handleChange} />
                                        { errors.title && touched.title ? (<div className="formError">*** {errors.title} ***</div>) : null }
                                </Form.Group>
                                <Button type='submit'>Add Notebook</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Fade>
        </Modal>
    )
    
}

export default AddNotebook