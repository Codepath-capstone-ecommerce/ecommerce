import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import AssignmentIcon from '@material-ui/icons/Assignment';
import WarningIcon from '@material-ui/icons/Warning';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import apiClient from '../../services/apiClient';
import { useAppStateContext } from '../../contexts/appStateContext';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: '#2ed9fb'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },

}));

export default function VendorDashboard() {
  const { appState, setAppState } = useAppStateContext()
  const classes = useStyles();
  const navigate = useNavigate()
  const emptyUser = async () => {
    await apiClient.logoutUser()
    navigate("/")
    setAppState({
      isAuthenticated: false,
    })
  }

  //   handleSelect(ranges){ console.log(ranges) }

  return (
    <div className={classes.root}>

      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Vendor Order Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem component={Link} to="/vendorDashboard" button key={'Home'}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem component={Link} to="/vendor/currentOrders" button key={'Current Orders'}>
            <ListItemIcon><WarningIcon /></ListItemIcon>
            <ListItemText primary={'Current Orders'} />
          </ListItem>
          <ListItem component={Link} to="/vendor/pastOrders" button key={'Past Orders'}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary={'Past Orders'} />
          </ListItem>
          <ListItem component={Link} to="/userAnalytics" key={'Messages'}>
            <ListItemIcon><MessageIcon /></ListItemIcon>
            <ListItemText primary={'User Analytics'} />
          </ListItem>
          <ListItem button key={'My Tasks'}>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary={'My Tasks'} />
          </ListItem>
          <ListItem button onClick={emptyUser} key={'Clients'}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItem>
        </List>
        <Divider />

      </Drawer>
    </div>
  );
}
