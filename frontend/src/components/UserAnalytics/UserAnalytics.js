import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Drawer, Avatar, List, ListItem, ListItemText, ListItemIcon, Box, Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MessageIcon from '@material-ui/icons/Message';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarGraph from "../BarGraph/BarGraph";
import LineGraph from "../LineGraph/LineGraph";
import classNames from "classnames";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReportIcon from '@material-ui/icons/Report';
import PersonRow from "../PersonRow/PersonRow";
import { DateRangePicker } from 'react-date-range'; // date range

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
    const classes = useStyles();
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
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
                    <ListItem button key={'Clients'}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary={'Clients'} />
                    </ListItem>
                </List>
            </Drawer>
            <Box m={4} display="flex" flexDirection="column" justifyContent="center">
                <Box m= {4} display="flex" flexDirection="row" justifyContent="space-between">
                    <Card className={classes.card}>
                        <CardContent className={classes.cardcontent}>
                            <AttachMoneyIcon />
                            <Typography>Sales</Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardcontent}>
                            <PeopleIcon />
                            <Typography>Clients</Typography>
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
                    months={2}
                    ranges={dateRange}
                    direction="horizontal"
                    className={classNames(classes.dateRange)}
                />
                <br></br>
                <LineGraph />
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