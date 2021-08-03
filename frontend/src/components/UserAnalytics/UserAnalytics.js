import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Drawer, Avatar, List, ListItem, ListItemText, ListItemIcon, Box, Card, Typography, CardContent, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MessageIcon from '@material-ui/icons/Message';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarGraph from "../BarGraph/BarGraph";
import LineGraph from "../LineGraph/LineGraph";
import classNames from "classnames";
import CustomerLineGraph from "../CustomerLineGraph/CustomerLineGraph";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReportIcon from '@material-ui/icons/Report';
import PersonRow from "../PersonRow/PersonRow";
import { DateRangePicker } from 'react-date-range'; // date range
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useNavigate } from "react-router";
import { useAppStateContext } from '../../contexts/appStateContext';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
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
        padding: theme.spacing(3),
    },
    card: {
        width: 150,
        height: 150,
        marginLeft: 10
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20%"
    },
    newCus: {
        width: 250,
        height: 250,
        marginLeft: 10
    }
}));


export default function UserAnalytics() {
    const [selectedDate, handleDateChange] = useState(new Date());
    const { appState, setAppState } = useAppStateContext()
    const navigate = useNavigate()
    const classes = useStyles();
    const [graphState, setGraphState] = useState({
        customers: false,
        orders: true
    })
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const emptyUser = async () => {
        await apiClient.logoutUser()
        navigate("/")
        setAppState({
            isAuthenticated: false,
        })
    }
    const showGraph = () => {
        setGraphState((a) => (
            {
                customers: !a.customers,
                orders: !a.orders
            }
        ))
    }

    console.log(graphState)
    const range = dateRange[0].endDate.getDate() - dateRange[0].startDate.getDate() + 1
    const start = dateRange[0].startDate
    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                anchor="left"
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Avatar></Avatar>
                <List>
                    <ListItem button key={'Dashboard'}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem button key={'Messages'}>
                        <ListItemIcon><MessageIcon></MessageIcon></ListItemIcon>
                        <ListItemText primary={'Messages'} />
                    </ListItem>
                    <ListItem button key={'My Tasks'}>
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary={'My Tasks'} />
                    </ListItem>
                    <ListItem button onClick={console.log('hi')} key={'Clients'}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary={'Clients'} />
                    </ListItem>
                    <ListItem component={Link} to="/vendordashboard" key={'Clients'}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem button onClick={emptyUser} key={'Clients'}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary={'Log Out'} />
                    </ListItem>
                </List>
            </Drawer>
            <Box m={4} display="flex" flexDirection="column" justifyContent="center">
                <Box m={4} display="flex" flexDirection="row" justifyContent="space-between">
                    <Card className={classes.card}>
                        <CardContent className={classes.cardcontent}>
                            <AttachMoneyIcon />
                            <Button onClick={showGraph}>Sales</Button>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardcontent}>
                            <PeopleIcon />
                            <Button onClick={showGraph}>Clients</Button>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardcontent}>
                            < ReportIcon />
                            <Typography>Report</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <DateRangePicker
                    onChange={item => setDateRange([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={dateRange}
                    direction="horizontal"
                    className={classNames(classes.dateRange)}
                />
                <br></br>
                {graphState.orders ? <LineGraph range={range} dateRange={dateRange} start={start} /> :
                    <CustomerLineGraph range={range} dateRange={dateRange} start={start} />}
                <br></br>
                <br></br>
                <Card className={classes.newCus}>
                    <Typography>New Customers</Typography>
                    <PersonRow />
                    <PersonRow />
                    <PersonRow />
                </Card>
            </Box>
        </div>
    )
}