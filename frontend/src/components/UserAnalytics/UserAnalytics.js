import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Drawer, Avatar, List, ListItem, ListItemText, ListItemIcon, Box, Card, Typography, CardContent, Button, FormControl, InputLabel, Select, MenuItem, Grid, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
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
import PersistentDrawerLeft from "../Practice/Practice";
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function UserAnalytics() {
    const [selectedDate, handleDateChange] = useState(new Date());
    const { appState, setAppState } = useAppStateContext()
    const navigate = useNavigate()
    const classes = useStyles();
    const [graphState, setGraphState] = useState({
        Customers: false,
        Sales: false
    })
    const [stats, setStats] = useState('')
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

    const handleChange = (event) => {
        setStats(event.target.value)
        let obj = {}
        for (const [key, value] of Object.entries(graphState)) {
            if (key === event.target.value) {
                obj[key] = true
            } else {
                obj[key] = false
            }
        }
        setGraphState(obj)
    }

    const range = dateRange[0].endDate.getDate() - dateRange[0].startDate.getDate() + 1
    const start = dateRange[0].startDate
    return (
        <div className={classes.root}>
            <PersistentDrawerLeft name={'User Analytics'}/>
            <Box mt={10} display="flex" flexDirection="column">
                <Typography variant="h2" component="h2">Hi, {appState.first_name}</Typography>
                <Grid container justifyContent="space-around">
                    <Grid item xs={5}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>User Stats Filter</InputLabel>
                            <Select value={stats} onChange={handleChange}>
                                <MenuItem value='Sales'>Sales</MenuItem>
                                <MenuItem value='Customers'>Customers</MenuItem>
                            </Select>
                            <FormHelperText>Choose to see graph</FormHelperText>
                        </FormControl>
                        {graphState.Sales ? <LineGraph range={range} dateRange={dateRange} start={start} /> :
                            graphState.Customers ?
                                <CustomerLineGraph range={range} dateRange={dateRange} start={start} /> : <div></div>}
                    </Grid>
                    <Grid
                        item
                        xs={5}
                        container
                    >
                        <DateRangePicker
                            onChange={item => setDateRange([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={dateRange}
                            direction="horizontal"
                            className={classNames(classes.dateRange)}
                        />
                    </Grid>
                </Grid>
            </Box>
            {/* <Box display="flex" flexDirection="row" justifyContent="space-around"> */}
            {/* <Box m={4} display="flex" flexDirection="row" justifyContent="space-between">
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
                            <Typography>Export PDF</Typography>
                        </CardContent>
                    </Card>
                </Box> */}
            {/* <Box m={4} display='flex' flexDirection="column" justifyContent='center'>
                    <FormControl className={classes.formControl}>
                        <InputLabel>User Stats Filter</InputLabel>
                        <Select value={stats} onChange={handleChange}>
                            <MenuItem value='Sales'>Sales</MenuItem>
                            <MenuItem value='Customers'>Customers</MenuItem>
                        </Select>
                    </FormControl>
                    {graphState.Sales ? <LineGraph range={range} dateRange={dateRange} start={start} /> :
                        graphState.Customers ?
                            <CustomerLineGraph range={range} dateRange={dateRange} start={start} /> : <div></div>}
                </Box>
                <Box mt={12}>

                    <DateRangePicker
                        onChange={item => setDateRange([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={dateRange}
                        direction="horizontal"
                        className={classNames(classes.dateRange)}
                    />
                </Box>
            </Box> */}
        </div>
    )
}