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

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginBottom: 100,
      },
      title: {
        fontSize: 70,
        fontWeight: "900"
      },
      navbar : {
        zIndex: "2 !important"
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
      <div >
            <div style={{
            height: 60,
            backgroundColor: "white",
            position: "relative",
            zIndex: 3
          }}>
            <NavBar className={classnames(classes.navbar)} />
            </div>
        {/* <div id="background" className={classes.mainBackground}> */}
        <div id="containBricks" class="container1" >
        <div id="backgroundBricks" class="container2" >
            <div class="row">
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
            </div>
            <div class="row">
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
          </div>
          <div class="row">
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
            </div>
            <div class="row">
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
          </div>
          <div class="row">
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
            </div>
            <div class="row">
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
          </div>
          <div class="row">
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
            </div>
            <div class="row">
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
          </div>
          <div class="row">
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
            </div>
            <div class="row">
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
          </div>
          <div class="row">
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
            </div>
            <div class="row">
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
          </div>
          <div class="row">
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
            </div>
            <div class="row">
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
            <div class="brick"></div>
          </div>
          <div class="row">
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
              <div class="brick"></div>
            </div>
          </div>
        <div style={{
            position: "relative",
            zIndex: 2,
            top: -30,
            marginTop: "--300",
            marginBottom: "150px",
          }}>
        <Box align="center"  m="auto" className={classnames(classes.customSign,"rectangle")}
            display="flex"
            justifyContent="center"
            // position= "absolute"
            alignItems="center"
            top="10px"
            right="50px">
                    <Typography align="left"style={{zIndex: "4 !important"}} className={classNames("title-font",classes.title, classes.overlay)} >
                      Simply Pizza .
                    </Typography>
                    <Typography align="left"style={{zIndex: "5 !important"}} className={classNames("shadow", "title-font", classes.title, classes.overlay2)} >
                      Simply Pizza .
                    </Typography>
            </Box>
            </div>
           
            {/* <div id="triangle" className={classNames("triangle")}></div> */}
            <div id="ovalContainer" class="container3">
            <img src={pizzaImg} alt="pizza_eye" class="oval"style={{
            zIndex: 8, 
            top: "0px"}}></img>
            </div>
            <div id="pyramidContainer" class="pyramidContainer">
            <div class="center" style={{
            position: "relative",
            zIndex: 1
          }}>
            <div class="neon-box"></div>
            <div class="neon-box2"></div>
            </div>
            <div class="center" style={{
            position: "relative",
            zIndex: 2,
            top: "0px",
            marginTop: "-593px"
          }}>
            <div class="shadow2">
            <div class="triangle-wrapper">
                <div class="triangle">
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                    <p id="triangle-line"></p>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        <div style={{
            height: 60,
            backgroundColor: "white",
            position: "relative",
            zIndex: 2
          }}>
            <Footer className={classnames(classes.navbar)} />
            </div>
      </div>
      
    );
  }