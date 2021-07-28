import Button from '@material-ui/core/Button';
import { useState } from "react"
import { Grid, Paper ,Avatar, TextField, Typography, Link} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from "react-router-dom";
import apiClient from '../../services/apiClient';
import { useAppStateContext } from '../../contexts/appStateContext';


export default function AddressForm(){
    const { appState, setAppState} = useAppStateContext()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address:"",
    email:"",
    postal_code:""
  })

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async () => {
        setIsProcessing(true)
        setErrors((e) => ({ ...e, form: null }))

        const {data, error } = await apiClient.loginUser({email: form.email, password: form.password})
        if (error){
          setErrors((e) => ({ ...e, form:error}))
        }
        if (data?.user){
            setAppState((a) => (
                {
                    ...a, 
                    first_name: data.user.first_name,
                    rewards:data.user.rewards,
                    last_name:data.user.last_last,
                    isAuthenticated: true,
                    email:data.user.email
                }
                ))
          apiClient.setToken(data.token)
        }
        setIsProcessing(false)
        navigate("/accountProfile")
      }

    const paperStyle = {
        padding:20,
        height:"70vh",
        width:280,
        margin:"20px auto"
    }
    return(
        <div>
            <Paper elevation = {10} style= {paperStyle}>
                <Typography variant="h6" align="center">Delivery Information</Typography>
                <TextField  
                    onChange={handleOnInputChange} 
                    name ="first_name"
                    label = "First Name" 
                    placeholder = "Enter first name"  
                    required
                />
                <TextField 
                    onChange={handleOnInputChange} 
                    name ="last_name"
                    label = "Last Name" 
                    placeholder = "Enter last name"   
                    required
                />
                <TextField 
                    onChange={handleOnInputChange} 
                    name ="address"
                    label = "Address" 
                    placeholder = "Enter address" 
                    fullWidth 
                    required
                />
                <TextField 
                    onChange={handleOnInputChange} 
                    name ="email"
                    label = "Email" 
                    placeholder = "Enter email" 
                    fullWidth 
                    required
                />
                <TextField 
                    onChange={handleOnInputChange} 
                    name ="postal_code"
                    label = "Postal Code" 
                    placeholder = "Enter postal code" 
                    fullWidth 
                    required
                />
            </Paper>
        </div>
    )
}