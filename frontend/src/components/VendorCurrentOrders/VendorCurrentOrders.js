import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import classNames from "classnames";
import Box from '@material-ui/core/Box';
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import VendorDashboard from "../VendorDashboard/VendorDashboard";
import { useAppStateContext } from '../../contexts/appStateContext';
import apiClient from "../../services/apiClient"

const fetchOrderByID = async (id) => {
  
  const { data, error } = await apiClient.getOrderByID(Number(id))
  // console.log(data.nutrition)
  // console.log(typeof(data.nutrition))
  if(data){
    console.log(data)
    }
}

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
  const { vendorState } = useAppStateContext()
  const classes = useStyles();
  
  // function handleClick(e) {
  //   console.log(e)
  //   e.preventDefault();
    
  // }


  
  const handleClick = value => console.log(value);

  return (
    <div className={classes.root}>
     
      <VendorDashboard/> 
      <main className={classes.content}>
      <Container className={classNames(classes.customContainer)}>
        <Typography align="left" className={classNames(classes.title)} >
        Current Orders
        </Typography>
        <List>
        {vendorState.currentOrders.map((order, index) => (
        <ListItem button key={order.order_id}>
        <Box
        border={.1}
        //style ={ index % 2? { background : "#F3F3F3" }:{ background : "white" }}
        display="flex"
        flexWrap="wrap"
        p={1}
        // bgcolor="background.paper"
        justifyContent = 'space-between'
        width="100%" 
        borderRadius={10}>
          
        Order #{order.order_id}
        <button 
        variant="contained" 
        color="primary" 
        style={{ height: 40 }}
        value={Number(order.order_id)}
        onClick={() => handleClick(order.order_id)}
        
        >
        Show More
      </button>
        </Box>
        
      </ListItem>
            ))}
            {/* {vendorState.map((text, index) => (
              <ListItem button key={text}>
                <Box
                border={.1}
                style ={ index % 2? { background : "#F3F3F3" }:{ background : "white" }}
                display="flex"
                flexWrap="wrap"
                p={1}
                // bgcolor="background.paper"
                justifyContent = 'space-between'
                width="100%" 
                borderRadius={10}>
                  
                {text}
                <Button 
                variant="contained" 
                color="primary" 
                style={{ height: 40 }}
                onClick={handleClick}
              >
                Show More
              </Button>
                </Box>
                
              </ListItem>
            ))} */}
          </List>
        </Container>
      </main>
    </div>
  );
}
