import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor'

import { Notes } from '../../api/notes'
import {accountContainer} from '../containers/accountContainer'

import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const Toolbar = accountContainer((props) => {

    const [show, setShow] = useState(false)

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
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleDelete = () => {
        Notes.remove({ _id: props.currentNote }, error => {
            if (error) {
                console.log(error.reason)
            } else {
                handleClose()
            }
        })
    }
    
    return (
        <Navbar expand="md" bg="dark" variant="dark" style={{justifyContent: 'space-between'}}>
            <Navbar.Brand>Proser</Navbar.Brand>
            <Navbar.Collapse style={{justifyContent: 'flex-end'}}>
            {/* <div style={{display: 'flex', justifyContent: 'space-between'}}> */}
                <DropdownButton alignRight drop="down" size="sm" style={{margin: '5px'}} title="File">
                    <Dropdown.Item onClick={props.newFile}>New</Dropdown.Item>
                    <Dropdown.Item onClick={props.saveFile}>Save</Dropdown.Item>
                    <Dropdown.Item onClick={handleModal}>Delete</Dropdown.Item>
                </DropdownButton>
                <DropdownButton alignRight drop="down" size="sm" style={{margin: '5px'}} title="Tools">
                    <Dropdown.Item onClick={() => props.handleTools('rhyme')}>Rhymer</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.handleTools('adj')}>Adjectives</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.handleTools('finder')}>Word Finder</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.handleTools('syn')}>Synonyms/Antonyms</Dropdown.Item>
                </DropdownButton>
                <DropdownButton alignRight drop="down" size="sm" style={{margin: '5px'}} className="avatar" title={props.account.user.profile.firstName + ' ' + props.account.user.profile.lastName}>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                </DropdownButton>
            </Navbar.Collapse>
            {/* </div> */}
            <Modal
                show={show}
                onHide={handleClose}
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
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>Delete Note</Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    )
})

export default withRouter(Toolbar)