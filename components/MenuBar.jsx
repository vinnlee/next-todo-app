import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import { useUser } from '../context/useUser'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  }
}))

export default function MenuBar({ title }) {
  const classes = useStyles()
  const { logout } = useUser()
  const [drawer, setDrawer] = React.useState(false)

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setDrawer(state)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={() => logout()}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={drawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List className={classes.list} component="nav">
          <Link href="/dashboard" passHref>
            <ListItem key="todolist" button component="a">
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="Todo List" />
            </ListItem>
          </Link>
          <Link href="/profile" passHref>
            <ListItem key="profile" button component="a">
              <ListItemIcon>
                <SettingsApplicationsIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
        </List>
      </SwipeableDrawer>
    </div>
  )
}
