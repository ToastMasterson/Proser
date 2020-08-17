import React, { useState } from 'react'
import { Paper, Typography, Tabs, Tab } from '@material-ui/core'

import Signup from '../forms/Signup'
import Login from '../forms/Login'
import { landingStyles } from '../../stylesheets/landing'

const Landing = ({ handleAlert }) => {

    const [value, setValue] = useState(0)
    
    const classes = landingStyles()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const checkOption = () => {
        if (value === 1) {
            return <Signup handleAlert={handleAlert} />
        }

        return <Login handleAlert={handleAlert} />
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
        </div>
    )
}

export default Landing