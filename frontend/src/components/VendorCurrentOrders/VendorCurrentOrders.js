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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import { formatDateLabel } from "../../utils/format";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import { useEffect, useState } from "react";

import axios from "axios";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const fetchOrderByID = async (id) => {
  
  const { data, error } = await apiClient.getOrderByID(Number(id))
  // console.log(data.nutrition)
  // console.log(typeof(data.nutrition))
  if(data){
    console.log(data)
    }
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    green: {
      main: '#43a047',
    }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    position: 'relative',
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
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  showMoreButton: {
    color: theme.palette.green,
    height: 30
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VendorCurrentOrders() {
  const { vendorState } = useAppStateContext()
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('')
  const [modalId, setModalId] = useState("")
  const [currentID, setCurrentID] = useState(0)
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function preventDefault(event) {
    event.preventDefault();
  }
  useEffect(() => {
    // action on update of modal
    const fetchOrderDetails = async () => {
      let jsonData = {"orderId": 14}
      try {
        const response = await axios.get(`http://localhost:3001/order/detailByID`, {
            method: 'GET',
            body: JSON.stringify({
              orderId: 14
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
          console.log(response)
       // console.warn(response.data);
    } catch (error) {
        console.warn(error);
    }
     
    }
  
      fetchOrderDetails()
    
    
  }, [modalId]);
  

   const  handleIconClicks = (id) => {
    // setCurrentID(modalId)
    setModalId(id)
    handleOpen()
    console.log(id)
}
  
  const handleClick = value => console.log(value);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal ID: {modalId}</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <div className={classes.root}>
     
      <VendorDashboard/> 
      <main className={classes.content}>
      <Container className={classNames(classes.customContainer)}>
        <Typography align="left" className={classNames(classes.title)} >
        Current Orders
        </Typography>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Order ID</TableCell>
            <TableCell align="left">Minutes Past</TableCell>
            <TableCell align="left">Delivery</TableCell>
            <TableCell align="center">Order Information</TableCell>
            <TableCell align="center">Complete Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendorState.currentOrders.map((order, index) => (
            <TableRow 
            key={order.order_id} 
            style ={ index % 2? { background : "#F3F3F3" }:{ background : "white" }}
            >
              <TableCell align="left">{order.order_id}</TableCell>
              <TableCell align="left">{formatDateLabel(order.created_at)}</TableCell>
              <TableCell align="left">{(order.delivery_address === "pick-up" ? "No" : "Yes")}</TableCell>
              <MuiThemeProvider theme={theme}>
              <TableCell align="center"><Button id={order.order_id} onClick={() => handleIconClicks(order.order_id)}  variant="contained"  className={classes.showMoreButton}> Show More </Button></TableCell>
              <TableCell align="center"><Button  variant="contained" color="primary" style={{ height: 30 }}> Finish Order </Button></TableCell>
              
              </MuiThemeProvider>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
        </Container>
      </main>
    </div>
  );
}
