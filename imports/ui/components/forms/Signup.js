import React, { useState } from 'react'
import { Accounts } from 'meteor/accounts-base'

import { withRouter } from 'react-router'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Signup = (props) => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        show: false
    })

    const handleChange = () => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const handleSignUp = () => {
        event.preventDefault()
        Accounts.createUser({
            email: state.email,
            password: state.password,
            createdAt: new Date(),
            profile: {
                firstName: state.firstName,
                lastName: state.lastName,
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
        <Form onSubmit={handleSignUp}>
            <Row>
                <Col>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="firstName" type="text" placeholder="John" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" type="text" placeholder="Snow" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="confirmPassword" type="password" placeholder="Re-enter Password" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="submit">
                Sign Up
            </Button>
        </Form>
    )
}

export default withRouter(Signup)