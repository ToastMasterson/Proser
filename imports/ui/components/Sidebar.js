import React from 'react'
import Nav from 'react-bootstrap/Nav'

const Sidebar = ({notes, handleNotes}) => {

    return (
        <Nav variant="pills" className="flex-column" defaultActiveKey={'/' + notes[0].title}>
            {notes.map(note => (
                <Nav.Item>
                    <Nav.Link onClick={() => handleNotes(note)} eventKey={'/' + note.title}>{note.title}</Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    )
}

export default Sidebar