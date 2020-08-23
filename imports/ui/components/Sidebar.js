import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'

import { Typography, Divider, Button, List, ListSubheader, ListItem, ListItemText, Collapse, ListItemIcon, Menu, MenuItem } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import NoteIcon from '@material-ui/icons/Note'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { sidebarStyles } from '../stylesheets/sidebar'
import AddNotebook from './modals/AddNotebook'
import ConfirmNotebookDelete from './modals/ConfirmNotebookDelete'
import RenameNotebook from './modals/RenameNotebook'
import EmptyTrash from './modals/EmptyTrash'

const Sidebar = ({notebooks, trash, currentNotebook, currentNote, handleNotes, handleAlert, handleNotebooks, newFile}) => {

    const classes = sidebarStyles()

    const [state, setState] = useState({
        modal: '',
        selectedNotebook: null,
        openNotebook: '',
        openTrash: false,
        mouseX: null,
        mouseY: null
    })

    const handleModalSelect = (modal) => {
        setState({ ...state, mouseX: null, mouseY: null,  modal })
    }

    const checkModals = () => {
        switch (state.modal) {
            case 'addNotebook':
                return <AddNotebook show={true} handleAlert={handleAlert} handleModalClose={handleModalClose} />
            
            case 'deleteNotebook':
                return (
                    <ConfirmNotebookDelete 
                        show={true} 
                        notebookId={state.selectedNotebook._id} 
                        handleModalClose={handleModalClose}
                        handleDeleteNotebook={handleDeleteNotebook} />
                )
            
            case 'renameNotebook':
                return (
                    <RenameNotebook 
                        show={true} 
                        notebook={state.selectedNotebook} 
                        handleModalClose={handleModalClose}
                        handleRenameNotebook={handleRenameNotebook} />
                )

            case 'emptyTrash':
                return (
                    <EmptyTrash
                        show={true}
                        handleModalClose={handleModalClose}
                        handleEmptyTrash={handleEmptyTrash} />
                )

            default:
                break;
        }
    }

    const handleModalClose = () => {
        setState({ ...state, modal: '' })
    }

    const handleExpand = (notebook) => {
        state.openNotebook === notebook.title 
            ? setState({ ...state, openNotebook: '', openTrash: false }) 
            : setState({ ...state, openNotebook: notebook.title, openTrash: false })
        handleNotebooks(notebook)
    }

    const handleTrash = () => {
        setState({ ...state, openNotebook: '', openTrash: !state.openTrash })
    }

    const titleChecks = (title) => {
        return title.length > 8 ? title.substring(0, 8) + '...' : title
    }

    const handleDeleteNotebook = (notebookId) => {
        Meteor.call('notebooks.deleteNotebook', notebookId, (error, result) => {
            if (error !== undefined) {
                handleAlert(false, error.reason)
            } else {
                handleModalClose()
                handleAlert(true, 'Notebook Deleted')
            }
        })
    }

    const handleRenameNotebook = (notebookId, newTitle) => {
        console.log(newTitle)
        Meteor.call('notebooks.renameNotebook', notebookId, newTitle, (error) => {
            if (error !== undefined) {
                handleAlert(false, error.reason)
            } else {
                handleModalClose()
                handleAlert(true, 'Notebook Renamed')
            }
        })
    }

    const handleContextMenu = (event, notebook) => {
        event.preventDefault()
        setState({ ...state, selectedNotebook: notebook, mouseX: event.clientX - 2, mouseY: event.clientY - 2 })
    }

    const handleEmptyTrash = () => {
        Meteor.call('notes.emptyTrash', (error) => {
            if (error !== undefined) {
                handleAlert(false, error.reason)
            } else {
                handleAlert(true, 'Trash Emptied')
            }
        })
    }

    const handleClose = () => {
        setState({ ...state, mouseX: null, mouseY: null })
    }

    const checkNotes = () => {
        return notebooks.length > 0
            ? 
            <List component='nav' >
                {notebooks.map(notebook => (
                    <div key={notebook._id}>
                    <ListItem button 
                        onContextMenu={() => handleContextMenu(event, notebook)}
                        onClick={() => handleExpand(notebook)} 
                        selected={notebook._id === currentNotebook._id}>
                        <ListItemIcon><MenuBookIcon /></ListItemIcon>
                        <ListItemText 
                            primary={ state.openNotebook === notebook.title ? notebook.title : titleChecks(notebook.title)} />
                        { state.openNotebook === notebook.title ? <ExpandMore /> : <ExpandLess /> }
                    </ListItem>
                    <Collapse in={state.openNotebook === notebook.title} timeout='auto' unmountOnExit>
                        <List 
                            className={classes.subList}
                            component='div' 
                            disablePadding 
                            subheader={
                                <ListSubheader className={classes.subListSubheader} component='div'>
                                    <Button 
                                        size='small'  
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
                <Divider />
                <ListItem button onClick={handleTrash} selected={state.openTrash}>
                    <ListItemIcon><DeleteIcon /></ListItemIcon>
                    <ListItemText primary='Trash' />
                    { state.openTrash ? <ExpandMore /> : <ExpandLess /> }
                </ListItem>
                <Collapse in={state.openTrash} timeout='auto' unmountOnExit>
                    <List 
                        className={classes.subList}
                        component='div' 
                        disablePadding 
                        subheader={
                            <ListSubheader className={classes.subListSubheader} component='div'>
                                <Button 
                                    size='small'
                                    onClick={() => handleModalSelect('emptyTrash')}
                                    endIcon={ <DeleteForeverIcon color='error' /> } >
                                    Empty Trash
                                </Button>
                            </ListSubheader>}>
                        { trash.map(note => (
                            <ListItem key={note._id} button 
                                onClick={() => handleNotes(note)} 
                                selected={note._id === currentNote._id}>
                                <ListItemIcon><NoteIcon /></ListItemIcon>
                                <ListItemText primary={note.title} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
            : null
    }

    return (
        <div className={classes.sidebar}>
            <Typography variant='h5' align='center' className={classes.sidebarHeader}>Your Notebooks</Typography>
            <Divider />
            <div className={classes.addButton}>
                <Button 
                size='small' 
                variant='contained' 
                color='primary' 
                endIcon={<AddCircleIcon />} 
                onClick={() => handleModalSelect('addNotebook')}>
                    Add Notebook
                </Button>
            </div>
            <Divider />
            {checkNotes()}
            {checkModals()}
            <Menu
                keepMounted
                open={state.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                state.mouseY !== null && state.mouseX !== null
                    ? { top: state.mouseY, left: state.mouseX }
                    : undefined
                }
            >
                <MenuItem onClick={() => handleModalSelect('renameNotebook')}> Rename </MenuItem>
                <MenuItem onClick={() => handleModalSelect('deleteNotebook')}> Delete </MenuItem>
            </Menu>
        </div>
    )
}

export default Sidebar