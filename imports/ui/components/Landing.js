import React, { useState } from 'react'
import { Accounts } from 'meteor/accounts-base'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Signup from './forms/Signup'
import Login from './forms/Login'

const Landing = () => {

    const [option, setOption] = useState(true)

    const handleSwitch = () => {
        setOption(!option)
    }

    const checkOption = () => {
        if (!option) {
            return <Signup />
        }

        return <Login />
    }

    return (
        <Container>
            <div>
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
        </Container>
    )
}

export default Landing