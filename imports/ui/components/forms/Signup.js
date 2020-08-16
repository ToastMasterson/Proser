import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import * as Yup from 'yup'

import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress, Grid } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { landingStyles } from '../../stylesheets/landing'

const SignupSchema = Yup.object({
    firstName: Yup.string()
        .min(2, 'Name too short')
        .max(20, 'Name too long')
        .matches(/^[a-zA-z]+$/, 'Can only include letters')
        .required('First name required'),
    lastName: Yup.string()
        .min(2, 'Name too short')
        .max(20, 'Name too long')
        .matches(/^[a-zA-z]+$/, 'Can only include letters')
        .required('Last name required'),
    email: Yup.string()
        .max(100, 'Email is too long')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/[a-z]/, 'Password must have one lowercase letter')
        .matches(/[A-Z]/, 'Password must have one uppercase letter')
        .matches(/[\d]/, 'Password must include a digit')
        .matches(/[^\s/,~<]/, {excludeEmptyString: true}, 'Invalid password')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
        )
})

const Signup = (props) => {

    const classes = landingStyles()

    const [loading, setLoading] = useState(false)

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const handleSignUp = (values) => {
        event.preventDefault()
        Meteor.call('user.register', values, (error, result) => {
            if (error !== undefined) {
                props.handleAlert(false, error.reason)
                setLoading(false)
            } else {
                Meteor.loginWithPassword({id: result}, values.password, (error) => {
                    if (error !== undefined) {
                        props.handleAlert(false, error.reason)
                        setLoading(false)
                    } else {
                        props.handleAlert(true, 'Registration Successful')
                        props.history.push('/')
                    }
                })
                
            }
        })
    }

    return (
        <Formik 
            validationSchema={SignupSchema} 
            onSubmit={values => {
                setLoading(true)
                handleSignUp(values)
            }} 
            initialValues={initialValues}>
            {({ submitForm }) => (
                <Form className={classes.signup}>
                    <Grid container justify='center'>
                        <Grid item container justify='space-between'>
                        <Grid item xs={6}>
                            <Field
                                component={TextField}
                                className={classes.textField}
                                name='firstName' 
                                label='First Name'
                                placeholder='John' 
                                variant='outlined'
                                size='small'
                                fullWidth
                                disabled={loading} />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                component={TextField}
                                className={classes.textField}
                                name='lastName'
                                label='Last Name'
                                placeholder='Snow'
                                variant='outlined'
                                size='small'
                                fullWidth
                                disabled={loading} />
                        </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                className={classes.textField}
                                name='email' 
                                type='email' 
                                label='Email'
                                placeholder='handle@emailsite.com'
                                variant='outlined'
                                size='small'
                                disabled={loading}
                                fullWidth
                                helperText={`We'll never share your email with anyone`} />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                className={classes.textField}
                                name='password' 
                                type='password' 
                                placeholder='Password'
                                variant='outlined'
                                size='small'
                                disabled={loading}
                                fullWidth
                                helperText='Must be between 8 and 20 characters' />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                className={classes.textField}
                                name='confirmPassword' 
                                type='password' 
                                placeholder='Re-enter Password'
                                variant='outlined'
                                size='small'
                                disabled={loading}
                                fullWidth
                                helperText='Passwords must match' />
                        </Grid>
                        { loading && <LinearProgress /> }
                        <Button
                            className={classes.submitButton}
                            variant='contained'
                            color='primary'
                            size='large'
                            disabled={loading}
                            onClick={submitForm}>
                            Sign up
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default withRouter(Signup)