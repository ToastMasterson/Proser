import { makeStyles } from '@material-ui/core/styles'

export const sidebarStyles = makeStyles((theme) => ({
    sidebar: {

    },
    tabs: {
        marginTop: 30
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