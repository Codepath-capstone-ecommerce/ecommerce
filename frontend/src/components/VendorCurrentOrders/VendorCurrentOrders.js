import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import classNames from "classnames";
import Box from '@material-ui/core/Box';
import { Container } from "@material-ui/core";
import VendorDashboard from "../VendorDashboard/VendorDashboard";

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
  dateRange : {
    marginTop: 50,
    marginBottom: 50
  },
  title: {
    color: "#00000",
    fontSize: 35,
    fontWeight: 600, // or 'bold'
    marginTop:50
  },
  customContainer: {
    paddingLeft: 84,
    paddingRight: 84,
  }
}));

export default function VendorCurrentOrders() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
     
      <VendorDashboard/> 
      <main className={classes.content}>
      <Container className={classNames(classes.customContainer)}>
        <Typography align="left" className={classNames(classes.title)} >
        Current Orders
        </Typography>
        <List>
            {['Order 1', 'Order 2', 'Order 3', 'Order 4',].map((text, index) => (
              <ListItem button key={text}>
                <Box
                display="flex"
                flexWrap="wrap"
                p={1}
                // bgcolor="background.paper"
                justifyContent = 'space-between'
                borderRadius={10}>
                {text}
                </Box>
              </ListItem>
            ))}
          </List>
        </Container>
      </main>
    </div>
  );
}
