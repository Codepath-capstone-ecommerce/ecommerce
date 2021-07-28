import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import VendorDashboard from "../VendorDashboard/VendorDashboard";
import { useAppStateContext } from "../../contexts/appStateContext";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import {formatDate } from "../../utils/format";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { DateRangePicker } from 'react-date-range'; // date range
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

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
    marginTop: 50
  },
  title: {
    color: "#00000",
    fontSize: 35,
    fontWeight: 600, // or 'bold'
    marginTop: 50,
  },
  customContainer: {
    paddingLeft: 84,
    paddingRight: 84
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
  const [filterOrder, setFilterOrder] = useState(vendorState.pastOrders)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const start = dateRange[0].startDate
  const end = dateRange[0].endDate

  useEffect(() => {
    setFilterOrder(
      vendorState.pastOrders.filter(item => {
        let date = new Date(item.created_at)
        date.setHours(0,0,0,0)
        // console.log(date)
        // console.log("start: ",start)
        // console.log("end: ",end)
        return date >= start && date <= end;
     }
    ))
  }, [start, end, vendorState.pastOrders]);

  console.log(filterOrder)

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
        //console.log(vendorState.pastOrders)
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
      <div style={{
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'block'
    }}>
      
      </div>
      <main className={classes.content}>
      <Grid container
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: "100vh" }}>
          <Grid item xs='auto'>
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
        <Grid item xs={12}>
        <Container className={classNames(classes.customContainer)}>
          <Typography align="left" className={classNames(classes.title)}>
            Past Orders
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Date </TableCell>
                <TableCell align="left">Delivery</TableCell>
                <TableCell align="center">Order Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterOrder.map((order, index) => (
                <TableRow
                  key={order.order_id}
                  style={
                    index % 2
                      ? { background: "#F3F3F3" }
                      : { background: "white" }
                  }
                >
                  <TableCell align="left">{order.order_id}</TableCell>
                  <TableCell align="left">{formatDate(order.created_at)}</TableCell>
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
        </Grid>
        </Grid>
      </main>
     
    </div>
  );
}
