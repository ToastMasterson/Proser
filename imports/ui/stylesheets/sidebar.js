import { makeStyles } from '@material-ui/core/styles'

export const sidebarStyles = makeStyles((theme) => ({
    sidebar: {
        
    },
    sidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56, 
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
            minHeight: 48, 
        }, 
        [theme.breakpoints.up('sm')]: { 
            minHeight: 64, 
        }, 
        fontFamily: 'Poiret One, cursive'
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '10px'
    },
    subList: {
        marginLeft: 10
    },
    subListSubheader: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))