import Button from '@material-ui/core/Button';
import {Box, Grid, Paper ,Avatar, TextField, Typography, makeStyles, InputAdornment, IconButton,} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useState } from "react"
import apiClient from '../../services/apiClient';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from "react-router-dom"
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames'; //css and material ui style
import "./SignUp.css"
import DividerWithText from '../DividerWithText/DividerWithText'
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginBottom: 100,
      },
      title: {
        fontSize: 30,
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
         backgroundColor: "#000",
         width: '100vw',
         height: '100vh',
     },
     blue: {
        backgroundColor: "#2EDBFD",
        paddingTop: 2,
        paddingBottom: 2,
    },
    outlinePaper: { 
        borderRadius: 20, borderColor: "#2EDBFD", padding: 10,
        border: `4px solid`
    },
    notchedOutline: {
        borderWidth: "2px",
        borderColor: "black !important"
      }
}));

export default function SignUp(){
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        username: "",
        password: "",
        email:"",
        first_name:"",
        last_name:"",
        address:""
    })


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async () => {
        setIsProcessing(true)
        setErrors((e) => ({ ...e, form: null }))

        const {data, error } = await apiClient.signupUser(
            {
                // username: form.username, 
                password: form.password, 
                email: form.email,
                first_name:form.first_name, 
                last_name:form.last_name,
                address:form.address
            })
        if (error){
          setErrors((e) => ({ ...e, form:error}))
        }

        setIsProcessing(false)
        navigate("/login")
      }

    const paperStyle = {
        padding:20,
        height:"75vh",
        width:300,
        margin:"20px auto"
    }
    const classes = useStyles()

    return(
        <div className={classes.mainBackground}>
        <Grid >
            <Grid align = "center">
            <Box align="center"  p={4} 
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
            <Divider className={classes.blue}/>
            </Grid>
            <Paper elevation = {10} style= {paperStyle} className={classes.outlinePaper} variant="outlined" m={2}>
                <Grid align = "center">
                    <h1>
                        Sign Up
                    </h1>
                    <Typography style={{fontSize:'15px',
                            fontWeight: 'bold',}}> 
                    Already have an account? <Link to="/login">Sign in</Link> 
                    </Typography>
                    <Box m={1} >
                        <Button 
                        type = 'submit' 
                        variant = "contained" 
                        color = 'primary'
                        style= {{borderRadius: 25, 
                            backgroundColor: "#4285F7",
                            color: "white",
                            border: "2px solid #000",
                            textTransform: "none",
                            fontWeight: 'bold',
                        }} 
                        fullWidth
                        > <FcGoogle/> &nbsp;&nbsp; Continue with Google
                        </Button>
                        </Box>
                        <Box m={1} >
                        <Button 
                        type = 'submit' 
                        variant = "contained" 
                        color = 'primary'
                        style= {{borderRadius: 25, 
                            backgroundColor: "#010100",
                            color: "white",
                            border: "2px solid #000",
                            textTransform: "none",
                            fontWeight: 'bold',
                        }} 
                        fullWidth
                        > <FaApple/> &nbsp;&nbsp; Continue with Apple
                        </Button>
                        </Box>
                    <Box m={2} >
                    <DividerWithText>
                        <Typography align="left"style={{color: "#777677", fontSize:'14px'}}  >
                        or continue with email
                        </Typography>
                    </DividerWithText>
                    </Box>
                </Grid>
                <Grid container direction={"column"} spacing={1}>
                <Grid item>
                <Grid container spacing={1}>
                <Grid item xs={6}>  
                <TextField 
                    onChange={handleOnInputChange}
                    name = "first_name"
                    label = "First Name" 
                    placeholder = "" 
                    fullWidth 
                    required
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            color: "#000",
                            fontWeight: 'bold'
                        }
                      }}
                    variant="outlined"
                    InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline
                        }
                      }}
                />
                </Grid>  
                <Grid item xs={6}>    
                <TextField 
                    onChange={handleOnInputChange}
                    name = "last_name"
                    label = "Last Name" 
                    placeholder = "" 
                    fullWidth 
                    required
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            color: "#000",
                            fontWeight: 'bold'
                        }
                      }}
                    variant="outlined"
                    InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline
                        }
                      }}
                />
                </Grid> 
                </Grid>
                </Grid>
                <Grid item>
                <TextField 
                    onChange={handleOnInputChange}
                    name = "email"
                    label = "Email" 
                    placeholder = "" 
                    fullWidth 
                    required
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            color: "#000",
                            fontWeight: 'bold'
                        }
                      }}
                    variant="outlined"
                    InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline
                        }
                      }}
                />
                </Grid>
                <Grid item>
                <TextField 
                    onChange={handleOnInputChange}
                    name = "password"
                    label = "Password" 
                    placeholder = "" 
                    type = "password" 
                    fullWidth 
                    required
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            color: "#000",
                            fontWeight: 'bold'
                        }
                      }}
                    variant="outlined"
                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                    InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                       )
                       }}/>
                </Grid>
                <Grid item>
                <TextField 
                    onChange={handleOnInputChange}
                    name = "address"
                    label = "Address" 
                    placeholder = "" 
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            color: "#000",
                            fontWeight: 'bold'
                        }
                      }}
                    variant="outlined"
                    InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline
                        }
                      }}
                />
                </Grid>
                </Grid>
                <Box mt={4}>
                <Button 
                    onClick={handleOnSubmit}
                    type = 'submit' 
                    variant = "contained" 
                    color = 'primary'
                    style= {{borderRadius: 25, 
                        backgroundColor: "#2EDBFD",
                        fontWeight: 'bold',
                        color: "black",
                        border: "2px solid #000"
                    }} 
                    fullWidth
                    >Sign Up
                </Button>
                </Box>
            </Paper>
            <Divider className={classes.blue}/>
        </Grid>
        </div>
    )
}