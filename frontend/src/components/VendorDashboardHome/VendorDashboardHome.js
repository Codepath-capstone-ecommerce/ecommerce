import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from "classnames";
import VendorDashboard from "../VendorDashboard/VendorDashboard";
import { Link } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import WarningIcon from '@material-ui/icons/Warning';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  title: {
    color: "#00000",
    fontSize: 20,
    fontWeight: 600, // or 'bold'
    margin:20
  },
  customContainer: {
    paddingLeft: 84,
    paddingRight: 84,
    marginTop:100
  },
  custom: {
    minWidth: 345,
    borderRadius: 10,
    backgroundColor: "#FFAA06",
    color: "#FFFFFF",
  },
}));

export default function VendorDashboardHome() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
     
      <VendorDashboard/> 
      <main className={classes.content}>
          <div className={classes.customContainer}></div>
      <Grid 
       container
       direction="row"
       spacing={10}
       alignItems="center"
       justifyContent="space-evenly">
     
        <Grid item component={ Link } to="/vendor/currentOrders" style={{textDecoration:"none"}} >
        <Card className={classNames(classes.custom)} variant="outlined">
        <CardContent className={classes.cardContentContainer}>
        <WarningIcon />
       <Typography align="center" className={classNames(classes.title)} >
        Current Orders
        </Typography> 
   </CardContent>
    </Card>
    </Grid>
    <Grid item  component={ Link } to="/vendor/pastOrders" style={{textDecoration:"none"}}>
        <Card className={classNames(classes.custom)} variant="outlined">
        <CardContent className={classes.cardContentContainer}>
        <PeopleIcon />
       <Typography align="center" className={classNames(classes.title)} >
        Past Orders
        </Typography> 
   </CardContent>
    </Card>
    </Grid>
    
    </Grid>

      </main>
    </div>
  );
}
