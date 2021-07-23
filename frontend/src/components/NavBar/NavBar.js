import { Button, Box } from "@material-ui/core"
import { useNavigate, Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { useAppStateContext } from '../../contexts/appStateContext';
import UserDrawer from "../UserDrawer/UserDrawer";
import apiClient from '../../services/apiClient';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function NavBar() {
  const { appState, setAppState } = useAppStateContext()
  const navigate = useNavigate()
  const classes = useStyles()

  const emptyUser = async () => {
    await apiClient.logoutUser()
    navigate("/login")
    setAppState({
      isAuthenticated: false,
    })

  }
  return (
    <Box display="flex" justifyContent="space-between" m={3} px={15}>
      <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" alt="logo" width="40px" height="40px"></img>
      <Box className={classes.root}>
        <Button onClick={() => { navigate("/menu") }} variant="outlined">Menus</Button>
        <Button onClick={() => { navigate("/aboutUs") }} variant="outlined">Our Story</Button>
        <Button onClick={() => { navigate("/order") }} variant="outlined">Order Now</Button>
        {appState.isAuthenticated ? <UserDrawer></UserDrawer> :
          <Button onClick={() => { navigate("/login") }} variant="outlined" >Login</Button>
        }
        {appState.isAuthenticated ? <Button onClick={emptyUser} variant="outlined">Log Out</Button> :
          <Button onClick={() => { navigate("/signup") }} variant="outlined" >Sign Up</Button>
        }
      </Box>
    </Box>

  )
}