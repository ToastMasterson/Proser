import React, { useState } from 'react'
import { Paper, Typography, Tabs, Tab, Snackbar, IconButton } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

import Signup from '../forms/Signup'
import Login from '../forms/Login'
import { landingStyles } from '../../stylesheets/landing'

const Landing = () => {

    const [error, setError] = useState("")
    const [value, setValue] = useState(0)
    const [open, setOpen] = useState(false)
    
    const classes = landingStyles()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const errorAlert = (errorMessage) => {
        setError(errorMessage)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const checkOption = () => {
        if (value === 1) {
            return <Signup errorAlert={errorAlert} />
        }

        return <Login errorAlert={errorAlert} />
    }

    return (
        <div className={classes.landing}>
            <Paper variant='outlined' className={classes.window}>
                <Typography variant='h3'> Welcome to Proser!</Typography>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    textColor='primary' 
                    indicatorColor='secondary'
                    centered >
                    <Tab className={classes.tabs} label='Login' />
                    <Tab className={classes.tabs} label='Sign up' />
                </Tabs>
                {checkOption()}
            </Paper>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose} >
                <MuiAlert variant='filled' severity='error'>
                    {error}
                    <IconButton size="small" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default Landing