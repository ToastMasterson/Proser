import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import {accountContainer} from '../containers/accountContainer'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


const Toolbar = accountContainer((props) => {

    const handleSignout = () => {
        Meteor.logout(error => {
            if (error) {
                console.log(error.reason)
            } else {
                props.history.push('/')
            }
        })
    }
    
    return (
        props.account.user
            ?
            <Navbar bg="dark" variant="dark" style={{justifyContent: 'space-between'}}>
                <Navbar.Brand>Proser</Navbar.Brand>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <DropdownButton title="File">
                        <Dropdown.Item>New</Dropdown.Item>
                        <Dropdown.Item>Save</Dropdown.Item>
                        <Dropdown.Item>Rename</Dropdown.Item>
                        <Dropdown.Item>Open</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title="Tools">
                        <Dropdown.Item onClick={() => props.handleTools('rhyme')}>Rhymer</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.handleTools('adj')}>Adjectives</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.handleTools('finder')}>Word Finder</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.handleTools('syn')}>Synonyms/Antonyms</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="avatar" title={props.account.user.profile.firstName + ' ' + props.account.user.profile.lastName}>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                    </DropdownButton>
                </div>
            </Navbar>
            : <div>Loading...</div>
    )
})

export default withRouter(Toolbar)