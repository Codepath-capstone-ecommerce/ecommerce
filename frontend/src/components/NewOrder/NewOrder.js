import { useEffect, useState } from "react"
import { Button, TextField, Paper, Grid, Avatar, Dialog, DialogTitle, DialogContent, Box } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import apiClient from '../../services/apiClient';

export default function NewOrder() {
    const [open, setOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [create,setCreate] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [form, setForm] = useState({
        name: "",
        image_url: "",
        price: 0,
        calories: 0,
        description: "",
        category: ""
    })


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async () => {
        setIsProcessing(true)
        setErrors((e) => ({ ...e, form: null }))

        const { data, error } = await apiClient.createProduct(
            {
                name: form.name,
                image_url: form.image_url,
                price: Number(form.price),
                calories: Number(form.calories),
                description: form.description,
                category: form.category
            })
        if (error) {
            setErrors((e) => ({ ...e, form: error }))
        }
        setIsProcessing(false)
        handleClose()
        window.location.reload()
    }

    const paperStyle = {
        padding: 20,
        height: "70vh",
        width: 280,
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>Add new item</Button>
            <Dialog aria-labelledby="customized-dialog-title" open={open} onClose={handleClose}>
                <DialogTitle id="customized-dialog-title">
                    Create Product
                </DialogTitle>
                <DialogContent dividers>
                    <Grid>
                        <Paper elevation={0} style={paperStyle}>
                            <TextField
                                onChange={handleOnInputChange}
                                name="name"
                                label="Product Name"
                                placeholder="Enter product name"
                                fullWidth
                                required
                            />
                            <TextField
                                onChange={handleOnInputChange}
                                name="image_url"
                                label="Image Url"
                                placeholder="Enter product image url"
                                fullWidth
                                required
                            />
                            <TextField
                                onChange={handleOnInputChange}
                                name="price"
                                label="Price"
                                placeholder="Enter a price"
                                fullWidth
                                required
                            />
                            <TextField
                                onChange={handleOnInputChange}
                                name="calories"
                                label="Calories"
                                placeholder="Enter product calories"
                                fullWidth
                                required
                            />
                            <TextField
                                onChange={handleOnInputChange}
                                name="description"
                                label="Description"
                                placeholder="Enter product description"
                                fullWidth
                                required
                            />
                            <TextField
                                onChange={handleOnInputChange}
                                name="category"
                                label="Category"
                                placeholder="Enter product category"
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
                                >Submit Product
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </DialogContent>

            </Dialog>
        </div>
    )
}