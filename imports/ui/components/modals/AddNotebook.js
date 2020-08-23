import React from 'react'
import { Meteor } from 'meteor/meteor'

import * as Yup from 'yup'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'


import { modalStyles } from '../../stylesheets/modal'
import { Divider } from '@material-ui/core'

const addNotebookSchema = Yup.object({
    title: Yup.string()
        .max(25, 'Entry too long')
        .min(1, 'Must include at least one character')
        .required('This field is required')
})

const AddNotebook = ({show, handleAlert, handleModalClose}) => {
    const classes = modalStyles()

    const initialValues = {
        title: ''
    }
    
    const handleAddNotebook = (values) => {
        event.preventDefault()

        Meteor.call('notebooks.addNewNotebook', values, (error) => {
            if (error !== undefined) {
                handleAlert(false, error.reason)
            } else {
                handleAlert(true, 'Notebook Added')
            }
        })

        handleModalClose()
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
                    <Typography variant='h4'>Add a new notebook</Typography>
                    <Divider className={classes.divider} />
                    <Formik 
                        validationSchema={addNotebookSchema} 
                        onSubmit={values => handleAddNotebook(values)} 
                        initialValues={initialValues} >
                        {({ submitForm }) => (
                            <Form onSubmit={submitForm}>
                                <Field 
                                    component={TextField}
                                    className={classes.textField}
                                    name='title' 
                                    label='Title'
                                    type='text'
                                    size='small'
                                    variant='outlined'
                                    fullWidth
                                    placeholder='New Notebook' />
                                <Button 
                                    className={classes.actionButton} 
                                    type='submit' 
                                    variant='contained' 
                                    color='primary'>
                                    Add Notebook
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Fade>
        </Modal>
    )
}

export default AddNotebook