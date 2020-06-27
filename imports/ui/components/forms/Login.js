import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
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
                console.log(error.reason)
            } else {
                //go home
            }
        })
    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
        </Form>
    )
}

export default Login