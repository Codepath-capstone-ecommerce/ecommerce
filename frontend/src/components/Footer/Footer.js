import { Button, Box, IconButton, Badge, Typography } from "@material-ui/core"
import { useNavigate, Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { useAppStateContext } from '../../contexts/appStateContext';
import UserDrawer from "../UserDrawer/UserDrawer";
import apiClient from '../../services/apiClient';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import classnames from 'classnames';
import { white } from "color-name";
import './Footer.css'; 
import pizzaImg from "../../assets/pizza.png"
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      paddingLeft: "30px",
      backgroundColor: "#fffff"
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
  },
  largeIcon: {
    width: 40,
    height: 40,
  },
  title:{
    fontWeight: 600, // or 'bold'
    fontSize: 30
  }
}));


export default function Footer() {
 
  const classes = useStyles()


  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} pr={5}>
        <Box className={classes.root}>
        <FacebookIcon className={classes.largeIcon}/>
        <TwitterIcon className={classes.largeIcon}/>
        <InstagramIcon className={classes.largeIcon}/>
        </Box>
        <Typography variant="body1" className={classes.title} color="inherit">
        46 Star Island Dr, Miami Beach, FL 33139
       </Typography>
       <Typography variant="body1" color="inherit">
                © 2021 Simply Pizza. 
       </Typography>
      
    </Box>

  )
}