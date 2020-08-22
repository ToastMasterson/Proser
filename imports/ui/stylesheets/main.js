import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

export const mainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    Main: {
      padding: 0,
      height: '100vh',
      backgroundImage: `url("https://www.photos-public-domain.com/wp-content/uploads/2012/05/ivory-off-white-paper-texture.jpg")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: {
        ...theme.mixins.toolbar,
        flexGrow: 1
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
          marginLeft: drawerWidth
      },
      height: '90%'
    },
    editor: {
      height: '90%'
    }
}))