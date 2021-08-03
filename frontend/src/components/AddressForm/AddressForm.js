import Button from '@material-ui/core/Button';
import { useEffect, useState } from "react"
import { Grid, Paper ,Avatar, TextField, Typography, Link, Input} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from "react-router-dom";
import apiClient from '../../services/apiClient';
import { useAppStateContext } from '../../contexts/appStateContext';


export default function AddressForm({form, setForm, setComplete}){
    const { appState, setAppState} = useAppStateContext()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    // const [complete,setComplete] = useState(false)
//     const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     address:"",
//     email:"",
//     postal_code:""
//   })
  useEffect(() =>{
      const checkDefaultValues = () =>{
          if(appState.first_name !==""){
              setForm((f) => ({ ...f, first_name: appState.first_name }))
          }
          if(appState.last_name !==""){
              setForm((f) => ({ ...f, last_name: appState.last_name }))
          }
          if(appState.address !==""){
              setForm((f) => ({ ...f, address: appState.address }))
          }
          if(appState.email !==""){
              setForm((f) => ({ ...f, email: appState.email }))
          }
        //   if(appState.postal_code !==""){
        //       setForm((f) => ({ ...f, postal_code: appState.postal_code }))
        //   }
      }
      checkDefaultValues()
  },[])

  useEffect(()=>{
    let c = true
    for (const [key, value] of Object.entries(form)) {
        if(form[key] === "" || (key ==="postal_code" && form[key].length !==5)){
            c = false
        }
    }
    setComplete(c)
    

  },[form])


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
    // console.log(complete)
    return(
        <div>
            <Paper elevation = {10} style= {paperStyle}>
                <Typography variant="h6" align="center">Delivery Information</Typography>
                <TextField  
                    onChange={handleOnInputChange} 
                    defaultValue={appState.first_name}
                    name ="first_name"
                    label = "First Name" 
                    placeholder = "Enter first name"  
                    required
                />
                <TextField 
                    onChange={handleOnInputChange} 
                    name ="last_name"
                    defaultValue={appState.last_name}
                    label = "Last Name" 
                    placeholder = "Enter last name"   
                    required
                />
                <TextField 
                    onChange={handleOnInputChange} 
                    name ="address"
                    defaultValue={appState.address}
                    label = "Address" 
                    placeholder = "Enter address" 
                    fullWidth 
                    required
                />
                <TextField 
                    onChange={handleOnInputChange} 
                    name ="email"
                    label = "Email"
                    defaultValue={appState.email} 
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