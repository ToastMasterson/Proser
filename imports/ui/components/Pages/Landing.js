import React, { useState } from 'react'
import { Paper, Typography, Tabs, Tab } from '@material-ui/core'

import Signup from '../forms/Signup'
import Login from '../forms/Login'
import { landingStyles } from '../../stylesheets/landing'

const Landing = () => {

    const [option, setOption] = useState(true)
    const [error, setError] = useState('')
    const [value, setValue] = useState(0)
    
    const classes = landingStyles()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const errorAlert = (error) => {
        setError(error)
    }

    const handleClose = () => {
        setError('')
    }

    const checkOption = () => {
        if (value === 1) {
            return <Signup errorAlert={errorAlert} />
        }

        return <Login errorAlert={errorAlert} />
    }

    // const checkError = () => {
    //     if (error !== '') {
    //         return (
    //             <Alert variant='danger' onClose={handleClose} dismissible>
    //                 <Alert.Heading>Whoops!</Alert.Heading>
    //                 <p>{error}</p>
    //             </Alert>
    //         )
    //     }
    // }

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
        </div>
    )
}

export default Landing