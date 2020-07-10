import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor'

import { Notes } from '../../api/notes'
import {accountContainer} from '../containers/accountContainer'

import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'

import AppBar from '@material-ui/core/AppBar'

import { appBarStyles } from '../stylesheets/appBar'
import { Toolbar, IconButton, Typography, Hidden, MenuItem, Backdrop, Fade, ButtonGroup } from '@material-ui/core'
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone'

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
        setState({...state, anchorEl: event.currentTarget, button: button})
    }
    
    const handleMenuClose = () => {
        setState({...state, anchorEl: null, button: null})
    }

    const handleSelect = (choice) => {
        handleMenuClose()
        switch (choice) {
            case 'new':
                props.newFile()
                break;
            case 'save':
                props.saveFile()
                break;
            case 'delete':
                handleDelete()
                break;
            case 'rhyme':
                props.handleTools('rhyme')
                break;
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
                break;
        }
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
                {/* <img className={classes.logo} src="/assets/logo.png" alt="Logo" /> */}
                <Typography className={classes.title} variant="h6" noWrap>Proser</Typography>
                <ButtonGroup variant="text" color="secondary">
                    <Button onClick={(event) => handleClick(event, 'file')}>
                        File
                    </Button>
                    <Button onClick={(event) => handleClick(event, 'tools')}>
                        Tools
                    </Button>
                    <Button onClick={(event) => handleClick(event, 'user')}>
                        <AccountCircleTwoToneIcon style={{marginRight: 5}} />
                        <Hidden smDown>
                            {props.account.user.profile.firstName[0] + '. ' + props.account.user.profile.lastName}
                        </Hidden>
                    </Button>
                </ButtonGroup>
                    <DropDown 
                        anchorEl={state.anchorEl}
                        open={state.button === 'file'}
                        onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleSelect('new')}>New</MenuItem>
                        <MenuItem onClick={() => handleSelect('save')}>Save</MenuItem>
                        <MenuItem onClick={() => handleSelect('delete')}>Delete</MenuItem>
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
            <Modal
                open={state.show}
                onClose={handleModalClose}
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
                className={classes.modal}
            >
                <Fade in={state.show}>
                    <div className={classes.modalPaper}>
                        <Typography variant="h5">
                            Confirm Deletion
                        </Typography>
                        <Typography variant="body1">
                            Once you delete this note it cannot be recovered.
                        </Typography>
                        <Button variant="contained" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" style={{backgroundColor: "#d32f2f"}} onClick={handleDelete}>Delete Note</Button>
                    </div>
                </Fade>
            </Modal>
            </Toolbar>
        </AppBar>
    )
})

export default withRouter(Navbar)