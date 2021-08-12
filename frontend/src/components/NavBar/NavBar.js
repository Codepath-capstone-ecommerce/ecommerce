import { Button, Box, IconButton, Badge } from "@material-ui/core"
import { useNavigate, Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { useAppStateContext } from '../../contexts/appStateContext';
import UserDrawer from "../UserDrawer/UserDrawer";
import apiClient from '../../services/apiClient';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import classnames from 'classnames';
import { white } from "color-name";
import './NavBar.css';
import pizzaImg from "../../assets/pizza.png"
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      backgroundColor: "#fffff",
      height:48
    },
  },
  customButton: {
    border: "3px solid",
    borderColor: "#2EDBFD !important",
    backgroundColor: "#000000",
    color: "white !important",
    "&:hover": {
      color: "black !important",
      backgroundColor: "#2EDBFD",
    }
  }
}));


export default function NavBar() {
  const { appState, setAppState } = useAppStateContext()
  const navigate = useNavigate()
  const classes = useStyles()

  const emptyUser = async () => {
    await apiClient.logoutUser()
    navigate("/")
    setAppState({
      first_name: "",
      last_name: "",
      email: "",
      is_admin: false,
      isAuthenticated: false,
      cart: [],
      review: [],
      favorites: [],
      rewards: 0,
      address: '',
      pastOrders: []
    })

  }
  return (
    <Box display="flex" justifyContent="space-between" my={1} px={5} height="64px">
      <Link to={"/"}>
        <img src={pizzaImg} id="pizza" alt="logo" ></img>
      </Link>
      <Box className={classes.root}>
        <Button onClick={() => { navigate("/menu") }} variant="outlined" className={classnames(classes.customButton, "glow-button")}>Menus</Button>
        {/* <Button onClick={() => { navigate("/aboutUs") }} variant="outlined" className={classnames(classes.customButton, "glow-button")}>Our Story</Button> */}
        {/* <Button onClick={() => { navigate("/order") }} variant="outlined" className={classnames(classes.customButton, "glow-button")}>Order Now</Button> */}
        {appState.isAuthenticated ? <UserDrawer></UserDrawer> :
          <Button onClick={() => { navigate("/login") }} variant="outlined" className={classnames(classes.customButton, "glow-button")} >Login</Button>
        }
        {appState.isAuthenticated ?
          <>
            <Button onClick={emptyUser} variant="outlined" className={classnames(classes.customButton, "glow-button")}>Log Out</Button>
            <IconButton onClick={() => { navigate("/cart") }}>
              <Badge badgeContent={appState.cart ? appState.cart.length : 0}>
                <ShoppingCartIcon style={{ color: "#000" }}></ShoppingCartIcon>
              </Badge>
            </IconButton>
          </> :
          <Button onClick={() => { navigate("/signup") }} variant="outlined" className={classnames(classes.customButton, "glow-button")}>Sign Up</Button>
        }
      </Box>
    </Box>

  )
}