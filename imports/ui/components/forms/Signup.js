import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Accounts } from 'meteor/accounts-base'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const SignupSchema = Yup.object({
    firstName: Yup.string()
        .min(2, 'Name too short')
        .max(20, 'Name too long')
        .matches(/[a-zA-Z]/)
        .required('First name required'),
    lastName: Yup.string()
        .min(2, 'Name too short')
        .max(20, 'Name too long')
        .matches(/[a-zA-Z]/)
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

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const handleSignUp = (values) => {
        event.preventDefault()
        Accounts.createUser({
            email: values.email,
            password: values.password,
            createdAt: new Date(),
            profile: {
                firstName: values.firstName,
                lastName: values.lastName,
                avatar: ''
            }
        }, error => {
            if (error) {
                props.errorAlert(error.reason)
            } else {
                props.history.push('/')
            }
        })
    }

    return (
        <Formik validationSchema={SignupSchema} onSubmit={values => handleSignUp(values)} initialValues={initialValues}>
            {({ handleSubmit, handleChange, touched, errors, isValid, values }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                name="firstName" 
                                type="text" 
                                value={values.firstName}
                                placeholder="John" 
                                onChange={handleChange} 
                                isValid={touched.firstName && !errors.firstName} />
                            { errors.firstName && touched.firstName ? (<div className="formError">*** {errors.firstName} ***</div>) : null }
                        </Form.Group>
                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                name="lastName" 
                                type="text" 
                                value={values.lastName}
                                placeholder="Snow" 
                                onChange={handleChange}
                                isValid={touched.lastName && !errors.lastName} />
                            { errors.lastName && touched.lastName ? (<div className="formError">*** {errors.lastName} ***</div>) : null }
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            name="email" 
                            type="email" 
                            value={values.email}
                            placeholder="Enter email" 
                            onChange={handleChange} 
                            isValid={touched.email && !errors.email} />
                        { errors.email && touched.email ? (<div className="formError">*** {errors.email} ***</div>) : null }
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password" 
                                type="password" 
                                value={values.password}
                                placeholder="Password" 
                                onChange={handleChange} 
                                isValid={touched.password && !errors.password} />
                            { errors.password && touched.password ? (<div className="formError">*** {errors.password} ***</div>) : null }
                            <Form.Text className="text-muted">
                                Password should be between 8 and 20 characters
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                name="confirmPassword" 
                                type="password" 
                                value={values.confirmPassword}
                                placeholder="Re-enter Password" 
                                onChange={handleChange} 
                                isValid={touched.confirmPassword && !errors.confirmPassword} />
                            { errors.confirmPassword && touched.confirmPassword ? (<div className="formError">*** {errors.confirmPassword} ***</div>) : null }
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default withRouter(Signup)