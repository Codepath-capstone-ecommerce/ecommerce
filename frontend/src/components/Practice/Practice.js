import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MessageIcon from '@material-ui/icons/Message';
import ListIcon from '@material-ui/icons/List';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { Link, Navigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router';
import apiClient from '../../services/apiClient';
import { useAppStateContext } from '../../contexts/appStateContext';
import NewOrder from '../NewOrder/NewOrder'
import { Box } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#2ed9fb'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft({ name }) {
    const classes = useStyles();
    const theme = useTheme();
    const { setAppState } = useAppStateContext()
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const emptyUser = async () => {
        await apiClient.logoutUser()
        navigate("/")
        setAppState({
            first_name: "",
            last_name: "",
            email: "",
            is_admin: false,
            isAuthenticated: false,
            cart: [],
            review: [],
            favorites: [],
            rewards: 0,
            address: '',
            pastOrders: []
        })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Typography variant="h6" noWrap>
                            {name}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => { navigate('/vendor/currentOrders') }} key={'Current Orders'}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={'Current Orders'} />
                    </ListItem>
                    <ListItem button onClick={() => { navigate('/vendor/pastOrders') }} key={'Past Orders'}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary={'Past Orders'} />
                    </ListItem>
                    <ListItem button onClick={() => { navigate('/userAnalytics') }} key={'User Analytucs'}>
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText primary={'User Analytics'} />
                    </ListItem>
                    <ListItem button onClick={() => { navigate('/vendor/products') }} key={'Products'}>
                        <ListItemIcon><FastfoodIcon /></ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItem>
                    <ListItem button onClick={emptyUser} key={'Clients'}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary={'Log Out'} />
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
            </main>
        </div>
    );
}