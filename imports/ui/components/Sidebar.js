import React, { useState } from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Typography, Divider } from '@material-ui/core'

import { sidebarStyles } from '../stylesheets/sidebar'

const Sidebar = ({notes, handleNotes}) => {

    const classes = sidebarStyles()

    const [value, setValue] = useState(0)

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
                onChange={handleChange}>
                {notes.map(note => (
                    <Tab key={note._id} label={note.title} onClick={() => handleNotes(note)} />
                ))}
            </Tabs>
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