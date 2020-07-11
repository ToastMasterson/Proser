import { makeStyles } from '@material-ui/core/styles'

export const modalStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      toolForm: {
        [theme.breakpoints.up('md')]:{
          fontSize: '1.3vw'
        },
        [theme.breakpoints.down('sm')]:{
          fontSize: '3vw'
        }
      },
      expansionPanel: {
        '&$disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
        },
      },
      panelSummary: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
          minHeight: 56,
        },
        '&$disabled': {
          opacity: '1'
        }
      },
      panelContent: {
        '&$expanded': {
          margin: '12px 0',
        },
      },
      deleteButtons: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      expanded: {},
      disabled: {}
}))