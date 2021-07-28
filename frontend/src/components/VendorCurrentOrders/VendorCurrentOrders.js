import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import classNames from "classnames";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import VendorDashboard from "../VendorDashboard/VendorDashboard";
import { useAppStateContext } from "../../contexts/appStateContext";
import apiClient from "../../services/apiClient";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import { formatDateLabel } from "../../utils/format";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Slide from "@material-ui/core/Slide";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import axios from "axios";


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    green: {
      main: "#43a047",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    position: "relative",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  dateRange: {
    marginTop: 50,
    marginBottom: 50,
  },
  title: {
    color: "#00000",
    fontSize: 35,
    fontWeight: 600, // or 'bold'
    marginTop: 50,
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
    height: 30,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function VendorCurrentOrders() {
  const { vendorState, setvendorState } = useAppStateContext();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState("");
  const [products, setProducts] = useState([]);

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
      const res = await axios.get("http://localhost:3001/order/detailByID", {
        params: {
          orderId: modalId,
        },
      });
      //const res = await apiClient.getOrderByID(modalId)
      if (res.data?.orders) {
        setProducts(res.data.orders);
      }
      //console.log(res.data.orders) //array of products
      if (modalId !== "") {
        handleOpen();
      }
    };

    fetchOrderDetails();
  }, [modalId]);

  const handleClickModal = (id) => {
    if (modalId === id) {
      handleOpen(); // no change needed just open current modal
    } else {
      setModalId(id); // change id and useEffect will auto change and open
    }
  };

  const handleClickCompleteOrder = async (id) => {
   let json = {"orderId" : id}
   const res = await apiClient.completeOrderDetailByID(json)
   console.log(res.data?.orders)
   setvendorState( (vendorState) => ( {
     //will need to do the same when adding new orders, except add to the vendor state, instead of filtering.
    currentOrders: vendorState.currentOrders.filter(order =>(
      order.order_id !== id //filtering, if id matches throw it out, otherwise keep all orders
    ))
   }))

  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography
        id="simple-modal-title"
        align="center"
        className={classNames(classes.title)}
      >
        Order ID: {modalId}
      </Typography>
      <Grid container direction="row" spacing={10} alignItems="center">
        {products.map((product, index) => (
          <Grid key={index} item>
            <Box
              display="flex"
              flexWrap="wrap"
              p={1}
              // bgcolor="background.paper"
              // css={{ maxWidth: 300 }}
              justifyContent="space-between"
              borderRadius={10}
            >
              <Box p={1} borderRadius={10}>
                <Typography
                  align="center"
                  className={classNames(classes.subTitle)}
                >
                  Product
                </Typography>
                <Typography
                  align="center"
                  className={classNames(classes.subTitle)}
                >
                  {product.product_id}
                </Typography>
              </Box>
              <Box p={1} borderRadius={10}>
                <Typography
                  align="center"
                  className={classNames(classes.subTitle)}
                >
                  Quantity
                </Typography>
                <Typography
                  align="center"
                  className={classNames(classes.subTitle)}
                >
                  {product.quantity}
                </Typography>
              </Box>
              <Divider></Divider>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );

  return (
    <div className={classes.root}>
      <VendorDashboard />
      <main className={classes.content}>
        <Container className={classNames(classes.customContainer)}>
          <Typography align="left" className={classNames(classes.title)}>
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
                  style={
                    index % 2
                      ? { background: "#F3F3F3" }
                      : { background: "white" }
                  }
                >
                  <TableCell align="left">{order.order_id}</TableCell>
                  <TableCell align="left">
                    {formatDateLabel(order.created_at)}
                  </TableCell>
                  <TableCell align="left">
                    {order.delivery_address === "pick-up" ? "No" : "Yes"}
                  </TableCell>
                  <MuiThemeProvider theme={theme}>
                    <TableCell align="center">
                      <Button
                        id={order.order_id}
                        onClick={() => handleClickModal(order.order_id)}
                        variant="contained"
                        className={classes.showMoreButton}
                      >
                        {" "}
                        Show More{" "}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleClickCompleteOrder(order.order_id)}
                        variant="contained"
                        color="primary"
                        style={{ height: 30 }}
                      >
                        {" "}
                        Finish Order{" "}
                      </Button>
                    </TableCell>
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
