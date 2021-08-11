import { useEffect, useState } from "react"
import { Button, TextField, Paper, Grid, Avatar, Dialog, DialogTitle, DialogContent, Box } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import apiClient from '../../services/apiClient';
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from '../../contexts/appStateContext';

export default function AccountEditModal({fieldToChange}) {
    const [open, setOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [create, setCreate] = useState(false)
    const { appState, setAppState } = useAppStateContext()
    const navigate = useNavigate()
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const [form, setForm] = useState({})


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async () => {
        setIsProcessing(true)
        setErrors((e) => ({ ...e, form: null }))

        if (fieldToChange === "email") {
            const { data, error } = await apiClient.updateEmail(form)
            if (data?.email) {
                setAppState((a) => (
                    {
                        ...a,
                        email: data.email
                    }
                ))
            }
        }else{
            const { data, error } = await apiClient.updateAddress(form)
            if (data?.address) {
                setAppState((a) => (
                    {
                        ...a,
                        address: data.address
                    }
                ))
            }
        }
        handleClose()
        navigate("/accountprofile")
    }

    const paperStyle = {
        padding: 20,
        height: 100,
        width: 280,
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>Edit</Button>
            <Dialog aria-labelledby="customized-dialog-title" open={open} onClose={handleClose}>
                <DialogTitle id="customized-dialog-title">
                    Edit {fieldToChange}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid>
                        <Paper elevation={0} style={paperStyle}>
                            <TextField
                                onChange={handleOnInputChange}
                                name={fieldToChange}
                                label={"New " +fieldToChange}
                                placeholder={"Enter new " + fieldToChange}
                                fullWidth
                                required
                            />
                            <Box mt={3}>
                                <Button
                                    onClick={handleOnSubmit}
                                    type='submit'
                                    variant="contained"
                                    color='primary'
                                    fullWidth
                                >Submit Changes
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </DialogContent>

            </Dialog>
        </div>
    )
}