import Button from '@material-ui/core/Button';
import {Box, Grid, Paper ,Avatar, TextField, Typography, Link} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useState } from "react"
import apiClient from '../../services/apiClient';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from "react-router-dom"

export default function SignUp(){
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
                username: form.username, 
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
        height:"70vh",
        width:280,
        margin:"20px auto"
    }
    return(
        <Grid>
            <Paper elevation = {10} style= {paperStyle}>
                <Grid align = "center">
                    <Avatar>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <h2>
                        Sign Up
                    </h2>
                </Grid>
                <TextField 
                    onChange={handleOnInputChange}
                    name = "username"
                    label = "Username" 
                    placeholder = "Enter username" 
                    fullWidth 
                    required
                />
                <TextField 
                    onChange={handleOnInputChange}
                    name = "email"
                    label = "Email" 
                    placeholder = "Enter email" 
                    fullWidth 
                    required
                />
                <TextField 
                    onChange={handleOnInputChange}
                    name = "password"
                    label = "Password" 
                    placeholder = "Enter a password" 
                    type = "password" 
                    fullWidth 
                    required
                />
                <TextField 
                    onChange={handleOnInputChange}
                    name = "first_name"
                    label = "First Name" 
                    placeholder = "Enter first name" 
                    fullWidth 
                    required
                />
                <TextField 
                    onChange={handleOnInputChange}
                    name = "last_name"
                    label = "Last Name" 
                    placeholder = "Enter last name" 
                    fullWidth 
                    required
                />
                <TextField 
                    onChange={handleOnInputChange}
                    name = "address"
                    label = "address" 
                    placeholder = "Enter your address" 
                    fullWidth
                />
                <Button 
                    onClick={handleOnSubmit}
                    type = 'submit' 
                    variant = "contained" 
                    color = 'primary' 
                    fullWidth
                    >Sign Up
                </Button>
            </Paper>
        </Grid>
    )
}