import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Toolbar = ({handleTools}) => {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Proser</Navbar.Brand>
            <NavDropdown title="File">
                <NavDropdown.Item>New</NavDropdown.Item>
                <NavDropdown.Item>Save</NavDropdown.Item>
                <NavDropdown.Item>Open</NavDropdown.Item>
                <NavDropdown.Item>Delete</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tools">
                <NavDropdown.Item onClick={() => handleTools('rhyme')}>Rhymer</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTools('adj')}>Adjectives</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTools('finder')}>Word Finder</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleTools('syn')}>Synonyms/Antonyms</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    )
}

export default Toolbar