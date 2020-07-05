import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = (props) => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleChange = () => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const handleLogin = () => {
        event.preventDefault()
        Meteor.loginWithPassword(state.email, state.password, error => {
            if (error) {
                props.errorAlert(error.reason)
            } else {
                props.history.push('/')
            }
        })
    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required name="email" type="email" placeholder="Enter email" onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required name="password" type="password" placeholder="Password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
        </Form>
    )
}

export default withRouter(Login)