import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor'

import { Notes } from '../../api/notes/notes'

import ConfirmDelete from './modals/ConfirmDelete'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, IconButton, Typography, Hidden, MenuItem, ButtonGroup } from '@material-ui/core'
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone'

import { appbarStyles } from '../stylesheets/appbar'

const Navbar = (props) => {
    
    const classes = appbarStyles()

    const [state, setState] = useState({
        show: false,
        anchorEl: null,
        button: null
    })
    
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
                props.handleAlert(false, error.reason)
            } else {
                props.handleAlert(true, 'Signout Successful')
                props.history.push('/')
            }
        })
    }

    const handleModalClose = () => {
        setState({...state, show: false})
    }

    const handleClick = (event, button) => {
        setState({...state, anchorEl: event.currentTarget, button: button})
    }
    
    const handleMenuClose = () => {
        setState({...state, anchorEl: null, button: null})
    }

    const handleConfirmationModal = () => {
        setState({...state, show: true, anchorEl: null, button: null})
    }

    const handleSelect = (choice) => {
        handleMenuClose()
        switch (choice) {
            case 'new':
                props.newFile()
                break
            case 'save':
                props.saveFile()
                break
            case 'delete':
                handleConfirmationModal()
                break
            case 'rhyme':
                props.handleTools('rhyme')
                break
            case 'adj':
                props.handleTools('adj')
                break
            case 'syn':
                props.handleTools('syn')
                break
            case 'finder':
                props.handleTools('finder')
                break
            case 'signout':
                handleSignout()
                break
            default:
                break
        }
    }

    const handleDelete = () => {
        Notes.remove({ _id: props.currentNote }, error => {
            if (error) {
                props.handleAlert(false, error.reason)
            } else {
                props.handleAlert(true, 'Note Deleted')
                handleModalClose()
            }
        })
    }
    
    return (
        <AppBar position='relative' className={classes.appbar}>
            <Toolbar>
                <Hidden mdUp>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={props.handleDrawerToggle}
                        className={classes.menuButton}>
                            <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography className={classes.title} variant='h6' noWrap> Proser </Typography>
                <ButtonGroup variant='text' color='secondary'>
                    <Button onClick={(event) => handleClick(event, 'file')}>
                        File
                    </Button>
                    <Button onClick={(event) => handleClick(event, 'tools')}>
                        Tools
                    </Button>
                    <Button onClick={(event) => handleClick(event, 'user')}>
                        <AccountCircleTwoToneIcon style={{marginRight: 5}} />
                        <Hidden smDown>
                            {props.user.profile.firstName[0] + '. ' + props.user.profile.lastName}
                        </Hidden>
                    </Button>
                </ButtonGroup>
                    <DropDown 
                        anchorEl={state.anchorEl}
                        open={state.button === 'file'}
                        onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleSelect('new')}>New</MenuItem>
                        <MenuItem onClick={() => handleSelect('save')}>Save</MenuItem>
                        <MenuItem disabled={props.currentNote === null} onClick={() => handleSelect('delete')}>
                            Delete
                        </MenuItem>
                    </DropDown>
                    <DropDown
                        anchorEl={state.anchorEl}
                        keepMounted
                        open={state.button === 'tools'}
                        onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleSelect('rhyme')}>Rhymer</MenuItem>
                        <MenuItem onClick={() => handleSelect('adj')}>Adjectives</MenuItem>
                        <MenuItem onClick={() => handleSelect('finder')}>Word Finder</MenuItem>
                        <MenuItem onClick={() => handleSelect('syn')}>Synonyms/Antonyms</MenuItem>
                    </DropDown>
                <DropDown
                    anchorEl={state.anchorEl}
                    keepMounted
                    open={state.button === 'user'}
                    onClose={handleMenuClose}>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem onClick={() => handleSelect('signout')}>Sign Out</MenuItem>
                </DropDown>
                <ConfirmDelete show={state.show} handleModalClose={handleModalClose} handleDelete={handleDelete} />
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(Navbar)