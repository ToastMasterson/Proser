import React, { useState } from 'react'

import * as Yup from 'yup'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import { modalStyles } from '../../stylesheets/modal'

const RenameSchema = Yup.object({
    newTitle: Yup.string()
        .required('Must provide a new title.')
        .min(1, 'Title must have one character')
        .max(20, 'New title must be less than or equal to 20 characters')
        .matches(/^[A-Za-z0-9\s]+$/, 'New title can only include numbers and letters')
})

const RenameNotebook = ({show, handleModalClose, notebook, handleRenameNotebook}) => {
    const classes = modalStyles()

    return ( 
        <Formik 
            initialValues={{ newTitle: notebook.title }}
            validationSchema={RenameSchema} 
            onSubmit={values => handleRenameNotebook(notebook._id, values.newTitle)}>
            {({ submitForm }) => (
                <Modal
                    open={show}
                    onClose={handleModalClose}
                    BackdropComponent={Backdrop}
                    BackdropProps={{timeout: 500}}
                    className={classes.modal}>
                    <Fade in={show}>
                        <Form>
                            <div className={classes.modalPaper}>
                                <Typography variant='h5' gutterBottom>
                                    Rename Notebook
                                </Typography>
                                <Field 
                                    component={TextField} 
                                    className={classes.textField}
                                    fullWidth 
                                    size='small' 
                                    variant='outlined' 
                                    label='New Title' 
                                    name='newTitle' />
                                <div className={classes.deleteButtons}>
                                    <Button variant='contained' onClick={handleModalClose}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant='contained' 
                                        color='primary' 
                                        onClick={submitForm}>
                                        Save Notebook
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Fade>
                </Modal>
            )}
        </Formik>
    )
}

export default RenameNotebook