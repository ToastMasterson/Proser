import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor'

import { Notes } from '../../api/notes'
import {accountContainer} from '../containers/accountContainer'

import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'

import AppBar from '@material-ui/core/AppBar'

import { appBarStyles } from '../stylesheets/appBar'
import { Toolbar, IconButton, Typography, Hidden, MenuItem } from '@material-ui/core'


const Navbar = accountContainer((props) => {

    const [state, setState] = useState({
        show: false,
        anchorEl: null,
        button: null
    })
    
    const classes = appBarStyles()

    const DropDown = (props) => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            {...props}/>
    )

    const handleSignout = () => {
        Meteor.logout(error => {
            if (error) {
                console.log(error.reason)
            } else {
                props.history.push('/')
            }
        })
    }

    const handleModal = () => {
        setState({...state, show: true})
    }

    const handleModalClose = () => {
        setState({...state, show: false})
    }

    const handleClick = (event, button) => {
        console.log(event.currentTarget)
        setState({...state, anchorEl: event.currentTarget, button: button})
    }
    
    const handleMenuClose = () => {
        setState({...state, anchorEl: null, button: null})
    }

    const handleDelete = () => {
        Notes.remove({ _id: props.currentNote }, error => {
            if (error) {
                console.log(error.reason)
            } else {
                handleModalClose()
            }
        })
    }
    
    return (
        <AppBar position="relative" className={classes.appBar}>
            <Toolbar>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        className={classes.menuButton}>
                            <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography className={classes.title} variant="h6" noWrap>Proser</Typography>
                <Button color="secondary" variant="contained" onClick={(event) => handleClick(event, 'file')}>
                    File
                </Button>
                <DropDown 
                    anchorEl={state.anchorEl}
                    keepMounted
                    open={state.button === 'file'}
                    onClose={handleMenuClose}>
                    <MenuItem onClick={props.newFile}>New</MenuItem>
                    <MenuItem onClick={props.saveFile}>Save</MenuItem>
                    <MenuItem onClick={handleModal}>Delete</MenuItem>
                </DropDown>
                <Button color="secondary" variant="contained" onClick={(event) => handleClick(event, 'tools')}>
                    Tools
                </Button>
                <DropDown
                    anchorEl={state.anchorEl}
                    keepMounted
                    open={state.button === 'tools'}
                    onClose={handleMenuClose}>
                    <MenuItem onClick={() => props.handleTools('rhyme')}>Rhymer</MenuItem>
                    <MenuItem onClick={() => props.handleTools('adj')}>Adjectives</MenuItem>
                    <MenuItem onClick={() => props.handleTools('finder')}>Word Finder</MenuItem>
                    <MenuItem onClick={() => props.handleTools('syn')}>Synonyms/Antonyms</MenuItem>
                </DropDown>
                <Button color="secondary" variant="contained" onClick={(event) => handleClick(event, 'user')}>
                    {props.account.user.profile.firstName + ' ' + props.account.user.profile.lastName}
                </Button>
                <DropDown
                    anchorEl={state.anchorEl}
                    keepMounted
                    open={state.button === 'user'}
                    onClose={handleMenuClose}>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                </DropDown>
            <Modal
                show={state.show}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Once you delete this note it cannot be recovered.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>Delete Note</Button>
                </Modal.Footer>
            </Modal>
            </Toolbar>
        </AppBar>
    )
})

export default withRouter(Navbar)