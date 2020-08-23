import { makeStyles } from '@material-ui/core/styles'

export const landingStyles = makeStyles((theme) => ({
    landing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    window: {
        padding: 20,
        textAlign: 'center',
        minWidth: 450,
        maxWidth: 550
    },
    tabs: {
        '&:active': {
            outline: 'none',
        },
        '&:focus': {
            outline: 'none',
        },
    },
    login: {},
    signup: {
        padding: 20
    },
    textField: {
        marginTop: 10
    },
    submitButton: {
        marginTop: 10,
    },
    title: {
        fontFamily: 'Poiret One, cursive'
    }
}))