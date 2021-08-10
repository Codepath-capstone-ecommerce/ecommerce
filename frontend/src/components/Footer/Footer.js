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
    <div class="containerr">
    <div class="row2">
      <div class="footer-col">
        <h4>Simply Pizza.</h4>
        <ul>
          <li><a href="#">about us</a></li>
          <li><a href="#">privacy policy</a></li>
          <li><a href="#">affiliate program</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>get help</h4>
        <ul>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">order status</a></li>
          <li><a href="#">payment options</a></li>
        </ul>
      </div>
      <div class="footer-col">
  	 			<h4>Locations</h4>
  	 			<ul>
          <li><a href="#">Miami, FL</a></li>
          <li><a href="#">San Francisco, CA</a></li>
          <li><a href="#">Dallas, TX</a></li>
        </ul>
  	 		</div>
      <div class="footer-col">
        <h4>follow us</h4>
        <div class="social-links">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    
    </div>
  </div>

  )
}