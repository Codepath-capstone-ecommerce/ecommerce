import Button from '@material-ui/core/Button';
import { useState } from "react"
import { Grid, Paper, Avatar, TextField, Typography,makeStyles,Box, InputAdornment, IconButton } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from "react-router-dom";
import apiClient from '../../services/apiClient';
import { useAppStateContext } from '../../contexts/appStateContext';
import "./Login.css"
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames'; //css and material ui style
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from 'react-router-dom';
import DividerWithText from '../DividerWithText/DividerWithText'
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

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const { appState, setAppState } = useAppStateContext()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [invalid, setInvalid] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async () => {
        setIsProcessing(true)
        setErrors((e) => ({ ...e, form: null }))

        const { data, error } = await apiClient.loginUser({ email: form.email, password: form.password })
        if (error) {
            setErrors((e) => ({ ...e, form: error }))
        }
        if (data?.user) {
            setAppState((a) => (
                {
                    ...a,
                    first_name: data.user.first_name,
                    rewards: data.user.rewards,
                    last_name: data.user.last_last,
                    isAuthenticated: true,
                    email: data.user.email,
                    is_admin: data.user.isAdmin
                }
            ))
            apiClient.setToken(data.token)
        }

        setIsProcessing(false)
        if (data?.user) {
            if (data.user.isAdmin) {
                navigate("/userAnalytics")
            } else {
                navigate("/accountProfile")
            }
        }else{
            setInvalid(true)
        }
    }

    const paperStyle = {
        padding: 20,
        height: "75vh",
        width: 300,
        margin: "20px auto"
    }
    const classes = useStyles()

    return (
        <div className={classes.mainBackground}>
            {invalid?<Box mt={3}><Typography align='center' color='error'>Invalid email/password, please try again</Typography></Box>:<div></div>}
            <Typography></Typography>
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
            <Paper elevation={10} style={paperStyle} className={classes.outlinePaper} variant="outlined" m={2}>
                <Grid align="center">
                    <h1>
                        Sign In
                    </h1>
                    <Typography style={{fontSize:'15px',
                            fontWeight: 'bold',}}> 
                    New to Simply Pizza?  <Link to="/signup">Sign Up</Link> 
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
                <Grid item >  
                <TextField
                    onChange={handleOnInputChange}
                    name="email"
                    label="Email"
                    placeholder=""
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
                <Grid item >  
                <TextField
                    onChange={handleOnInputChange}
                    name="password"
                    label="Password"
                    placeholder=""
                    type="password"
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
                       }}
                />
                </Grid>
                <FormControlLabel
                    control={
                        <Checkbox
                            // checked={state.checkedB}
                            // onChange={handleChange}
                            name="checkedB"
                            style={{color:"red"}}
                            
                        />
                    }
                    label="Remember Me"
                    style={{color:"black"}}
                />
                </Grid>
                <Box mt={4}>
                <Button
                    onClick={handleOnSubmit}
                    type='submit'
                    variant="contained"
                    color='primary'
                    style= {{borderRadius: 25, 
                        backgroundColor: "#2EDBFD",
                        fontWeight: 'bold',
                        color: "black",
                        border: "2px solid #000"
                    }} 
                    fullWidth
                >Sign in
                </Button>
                </Box>
            </Paper>
            <Divider className={classes.blue}/>
        </div>
    )
}