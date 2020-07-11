import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

export const appbarStyles = makeStyles((theme) => ({
    appbar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      },
      backgroundImage: `url("https://www.photohdx.com/images/2016/02/yellow-brown-leather-texture-background.jpg")`,
      backgroundSize: 'cover'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    title: {
      flexGrow: 1
    }
}))