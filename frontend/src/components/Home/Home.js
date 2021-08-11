import React from "react";
import { Box, makeStyles, withTheme } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames'; //css and material ui style
import NavBar from "../NavBar/NavBar";
import classnames from 'classnames';
import "./glitch.css"
import "./Brick.css"
import { grey } from "@material-ui/core/colors";
import Footer from "../Footer/Footer";
import pizzaImg from "../../assets/pizzaoven.jpeg"
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from '../../contexts/appStateContext';
import HomePage from '../../assets/HomePage.png'
import HomePage1 from '../../assets/HomePage1.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000000'
  },
  title: {
    fontSize: 70,
    fontWeight: "900"
  },
  navbar: {
    zIndex: "2 !important",
    backgroundColor: "#ffffff",
    height: "48px",
    padding:"0px"
  },
  overlay: {
    position: 'absolute',
    color: 'white',
    paddingTop: "15px",
    paddingRight: "3px"
  },
  overlay2: {
    position: 'absolute',
    color: 'white',
  },
  mainBackground: {
    backgroundColor: "#404040"
  }
}));

export default function Home() {
  const classes = useStyles()

  return (
    <div>
      <NavBar className={classnames(classes.navbar)} />
      <div className={classes.root}>
        <img src={HomePage} alt="neon background" width="100%" height="100%"></img>
        <Footer />
      </div>
    </div>
  );
}