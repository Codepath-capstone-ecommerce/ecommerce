import { Typography, Card, Link, Checkbox, Box, FormGroup, FormControlLabel, Button, Grid } from "@material-ui/core"
import NavBar from "../NavBar/NavBar"
import { makeStyles } from '@material-ui/core/styles';
import { useAppStateContext } from '../../contexts/appStateContext';
import { useEffect, useState } from "react";
import classNames from 'classnames'; //css and material ui style
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { formatAMPM, formatDate } from "../../utils/format";
import axios from "axios";
import { Divider } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { createTheme } from "@material-ui/core/styles";
import Footer from "../Footer/Footer";
import apiClient from '../../services/apiClient';
import { useNavigate } from "react-router-dom";
import AccountEditModal from "../AccountEditModal/AccountEditModal";


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

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 144,
    marginRight: 144

  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 16
  },
  custom: {
    textAlign: 'center',
    minWidth: 345,
    borderRadius: 10,
    backgroundColor: "#FFAA06",
    color: "#FFFFFF",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mainBackground: {
    backgroundColor: "#fff",
    borderRadius: 20, borderColor: "#2EDBFD",
    border: `6px solid`, margin: 60, color: '#000', padding: 5, paddingBottom: 20
  },
  secondaryBackground: {
    backgroundColor: "#fff",
  }
}));

export default function AccountProfile() {

  const { appState, setAppState } = useAppStateContext()
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalId, setModalId] = useState("");
  const navigate = useNavigate()
  // console.log(appState)
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    let form = { "address": "123456 Street" }
    const { data, error } = await apiClient.updateAddress(form)
    if (data?.address) {
      setAppState((a) => (
        {
          ...a,
          address: data.address
        }
      ))
    }
    navigate("/accountprofile")
  }

  const handleClick1 = async () => {
    let form = { "email":"sd2@google.com" }
    const { data, error } = await apiClient.updateEmail(form)
    if (data?.email) {
      setAppState((a) => (
        {
          ...a,
          email: data.email
        }
      ))
    }
    navigate("/accountprofile")
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
        console.log(res.data)
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
  // console.log(appState.pastOrders)

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

  console.log(appState)
  return (
    <div >
      <NavBar></NavBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>


      <Box className={classes.root}>
        <Typography variant="h1" component="h2" style={{ fontWeight: 'bold', }}>Hey, {appState.first_name}!</Typography>
        <Typography style={{ fontSize: '24px', }}>Welcome to your account dashboard</Typography>
      </Box>
      <div className={classes.mainBackground}>
        <br></br>
        <div className={classes.secondaryBackground}>
          <Box className={classes.root}>
            <Typography variant="h5" style={{ fontWeight: 'bold', }}>Your Orders</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Order ID</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Place At</TableCell>
                  <TableCell align="center">Delivery Address</TableCell>
                  <TableCell align="center">Order Information</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appState.pastOrders.map((order, index) => (
                  <TableRow
                    key={order.id}
                    style={
                      index % 2
                        ? { background: "#F3F3F3" }
                        : { background: "white" }
                    }
                  >
                    <TableCell align="left">{order.id}</TableCell>
                    <TableCell align="left">{formatDate(order.placed_at)}</TableCell>
                    <TableCell align="left">{formatAMPM(order.placed_at)}</TableCell>
                    <TableCell align="center">{order.delivery_address}</TableCell>
                    <TableCell align="center">
                      <Button
                        id={order.order_id}
                        onClick={() => handleClickModal(order.id)}
                        variant="contained"
                        className={classes.showMoreButton}
                      >
                        {" "}
                        Show More{" "}
                      </Button>
                    </TableCell>
                  </TableRow>


                ))}
              </TableBody>
            </Table>
            <Link>View All</Link>
          </Box>
          <br></br>

          <Box className={classes.root}>
            <Typography variant="h5" style={{ fontWeight: 'bold', }}> Contact Info</Typography>

            <Card>
              <Box p={4}>
                <Box>
                  <Typography>{appState.first_name} {appState.last_name}</Typography>
                  <Typography>{appState.email}</Typography>
                  <AccountEditModal fieldToChange='email'></AccountEditModal>
                </Box>
              </Box>
            </Card>
          </Box>
          <br></br>

          <Box className={classes.root}>
            <Typography variant="h5" style={{ fontWeight: 'bold', }}>Saved Addresses </Typography>
            <Card>
              <Box p={3}>
                {appState.address ? <Typography>{appState.address}</Typography> :
                  <Typography>You don't have any saved addresses</Typography>
                }
                {appState.address ? <AccountEditModal fieldToChange='address'></AccountEditModal> :
                  <div></div>
                }

              </Box>
            </Card>
          </Box>
          <br></br>

          <Box className={classes.root}>
            <Typography variant="h5" style={{ fontWeight: 'bold', }}>Saved Payments </Typography>
            <Card>
              <Box p={3}>
                <Typography>You don't have any saved methods</Typography>
              </Box>
            </Card>
          </Box>
          <br></br>

          <Box className={classes.root}>
            <Typography variant="h5" style={{ fontWeight: 'bold', }}>Email Notification</Typography>
            <Card>
              <Box className={classes.box}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" color="primary" />}
                    label="Send Offers"
                  />
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label="Order Receipts"
                  />
                </FormGroup>
              </Box>

            </Card>
          </Box>
        </div>
      </div>
      <Footer />
    </div>
  )
}