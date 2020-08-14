import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor'

import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'

import * as Yup from 'yup'
import { landingStyles } from '../../stylesheets/landing'

const LoginSchema = Yup.object({
    email: Yup.string()
        .max(100, 'Email is too long')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'That password is too short')
        .max(20, 'That password is too long')
        .required('Password is required'),
})

const Login = (props) => {

    const [loading, setLoading] = useState(false)

    const classes = landingStyles()

    const initialValues = {
        email: '',
        password: ''
    }

    // const handleChange = () => {
    //     setState({...state, [event.target.name]: event.target.value})
    // }

    const handleLogin = (values) => {
        event.preventDefault()

        Meteor.loginWithPassword(values.email, values.password, error => {
            if (error) {
                props.errorAlert(error.reason)
                setLoading(false)
            } else {
                props.history.push('/')
            }
        })
    }

    return (
        <Formik 
            validationSchema={LoginSchema} 
            onSubmit={values => {
                setLoading(true)
                handleLogin(values)}
             } 
            initialValues={initialValues}>
            {({ submitForm }) => (
                <Form>
                    <Field
                        component={TextField}
                        className={classes.textField}
                        name='email'
                        type='email'
                        label='Email'
                        variant='outlined'
                        fullWidth
                        disabled={loading} />
                    <Field
                        component={TextField}
                        className={classes.textField}
                        name='password'
                        type='password'
                        label='Password'
                        variant='outlined'
                        fullWidth
                        disabled={loading} />
                    <Button
                        className={classes.submitButton}
                        variant='contained'
                        color='primary'
                        size='large'
                        disabled={loading}
                        onClick={submitForm}>
                            Login
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default withRouter(Login)