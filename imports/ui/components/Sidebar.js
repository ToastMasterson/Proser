import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'

const Sidebar = ({notes, handleNotes}) => {

    return (
        <Nav variant='pills'>
            <Col>
                {notes.map(note => (
                    <Nav.Item>
                        <Nav.Link onClick={() => handleNotes(note)} action="true">{note.title}</Nav.Link>
                    </Nav.Item>
                ))}
            </Col>
        </Nav>
    )
}

export default Sidebar