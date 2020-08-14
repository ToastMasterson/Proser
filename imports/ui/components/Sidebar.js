import React, { useState } from 'react'

import { Typography, Divider, Button, List, ListSubheader, ListItem, ListItemText, Collapse, ListItemIcon } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import NoteIcon from '@material-ui/icons/Note'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { sidebarStyles } from '../stylesheets/sidebar'
import AddNotebook from './modals/AddNotebook'

const Sidebar = ({notebooks, currentNotebook, currentNote, handleNotes, handleNotebooks, newFile}) => {

    const classes = sidebarStyles()

    const [show, setShow] = useState(false)
    const [open, setOpen] = useState('')

    const handleAddNotebook = () => {
        setShow(true)
    }

    const handleModalClose = () => {
        setShow(false)
    }

    const handleExpand = (notebook) => {
        open === notebook.title ? setOpen('') : setOpen(notebook.title)
        handleNotebooks(notebook)
    }

    const titleChecks = (title) => {
        return title.length > 8 ? title.substring(0, 8) + '...' : title
    }

    const checkNotes = () => {
        return notebooks.length > 0
            ? 
            <List component="nav" >
                {notebooks.map(notebook => (
                    <div key={notebook._id}>
                    <ListItem button 
                        onClick={() => handleExpand(notebook)} 
                        selected={notebook._id === currentNotebook._id}>
                        <ListItemIcon><MenuBookIcon /></ListItemIcon>
                        <ListItemText primary={ open === notebook.title ? notebook.title : titleChecks(notebook.title)} />
                        { open === notebook.title ? <ExpandMore /> : <ExpandLess /> }
                    </ListItem>
                    <Collapse in={open === notebook.title} timeout='auto' unmountOnExit>
                        <List 
                            className={classes.subList}
                            component='div' 
                            disablePadding 
                            subheader={
                                <ListSubheader className={classes.subListSubheader} disableGutter component="div">
                                    <Button 
                                        size="small"  
                                        onClick={newFile}
                                        endIcon={ <AddCircleIcon /> } >
                                        Add Note
                                    </Button>
                                </ListSubheader>}>
                            { notebook.notes.map(note => (
                                <ListItem key={note._id} button 
                                    onClick={() => handleNotes(note)} 
                                    selected={note._id === currentNote._id}>
                                    <ListItemIcon><NoteIcon /></ListItemIcon>
                                    <ListItemText primary={note.title} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                    </div>
                ))}
            </List>
            : null
    }

    return (
        <div className={classes.tabs}>
            <Typography variant="h5" align="center" gutterBottom>Your Notebooks</Typography>
            <Divider />
            <div className={classes.addButton}>
                <Button 
                size="small" 
                variant="contained" 
                color="primary" 
                endIcon={<AddCircleIcon />} 
                onClick={handleAddNotebook}>
                    Add Notebook
                </Button>
            </div>
            <Divider />
            {checkNotes()}
            <AddNotebook show={show} handleModalClose={handleModalClose} />
        </div>
    )
}

export default Sidebar