import React from 'react'
import Nav from 'react-bootstrap/Nav'

const Sidebar = ({notes, handleNotes}) => {

    const checkNotes = () => {
        return notes.length > 0
            ? 
            <Nav variant="pills" className="flex-column" defaultActiveKey={'/' + notes[0].title}>
                {notes.map(note => (
                    <Nav.Item>
                        <Nav.Link onClick={() => handleNotes(note)} eventKey={'/' + note.title}>{note.title}</Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            : null
    }

    return (
        checkNotes()
    )
}

export default Sidebar