import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { mainStyles } from '../stylesheets/main'
import { Typography, Divider } from '@material-ui/core'
const Sidebar = ({notes, handleNotes}) => {

    const [value, setValue] = useState(0)

    const classes = mainStyles()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const checkNotes = () => {
        return notes.length > 0
            ? 
            <Tabs
                className={classes.sidebar}
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
            >
                {notes.map(note => (
                        <Tab label={note.title} onClick={() => handleNotes(note)} />
                ))}
            </Tabs>
            // <Nav variant="pills" className="flex-column" defaultActiveKey={'/' + notes[0].title} style={{marginTop: '5px'}}>
            //     {notes.map(note => (
            //         <Nav.Item>
            //             <Nav.Link onClick={() => handleNotes(note)} eventKey={'/' + note.title}>{note.title}</Nav.Link>
            //         </Nav.Item>
            //     ))}
            // </Nav>
            : null
    }

    return (
        <div className={classes.tabs}>
        <Typography variant="h5" align="center" gutterBottom>Your Notes</Typography>
        <Divider />
            {checkNotes()}
        </div>
    )
}

export default Sidebar