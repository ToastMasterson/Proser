import React, { useState } from 'react'
import { Accounts } from 'meteor/accounts-base'

import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Nav from 'react-bootstrap/Nav'
import Signup from '../forms/Signup'
import Login from '../forms/Login'

const Landing = () => {

    const [option, setOption] = useState(true)
    const [error, setError] = useState('')

    const handleSwitch = () => {
        setOption(!option)
    }

    const errorAlert = (error) => {
        setError(error)
    }

    const handleClose = () => {
        setError('')
    }

    const checkOption = () => {
        if (!option) {
            return <Signup errorAlert={errorAlert} />
        }

        return <Login errorAlert={errorAlert} />
    }

    const checkError = () => {
        if (error !== '') {
            return (
                <Alert variant="danger" onClose={handleClose} dismissible>
                    <Alert.Heading>Whoops!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )
        }
    }

    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h1>Welcome to Proser!</h1>
            </div>
            <Container className="login">
                <Nav justify variant="tabs">
                    <Nav.Item>
                        <Nav.Link disabled={option} onClick={handleSwitch}>Log In</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link disabled={!option} onClick={handleSwitch}>Sign Up</Nav.Link>
                    </Nav.Item>
                </Nav>
                {checkOption()}
            </Container>
            <Container className="alert">
                {checkError()}
            </Container>
        </Container>
    )
}

export default Landing