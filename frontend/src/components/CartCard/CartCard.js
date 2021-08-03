import { Card, Typography, Box, Button, CardContent, CardMedia, Grid, IconButton } from "@material-ui/core"
import { useAppStateContext } from '../../contexts/appStateContext';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

//write function that can send products to a cart once buttons are clicked
export default function CartCard({ product }) {
    const { appState, setAppState } = useAppStateContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState([])
    const [price, setPrice] = useState(0)
    const [total,setTotal] = useState(appState.cart.length)
    let t = 0
    for (let i =0; i<appState.review.length;i++){
        t+= appState.review[i].quantity
    }
    const check = appState.review[appState.review.findIndex(products => products.name === product.name)]
    const initialize = check && t ===total? check.quantity : product.quantity
    const [quantity, setQuantity] = useState(initialize);

    // console.log(product)
    // console.log(appState.review)

    const increment = () => {
        setQuantity((q) => (q + 1))
    }


    const decrement = () => {
        if (quantity !== 0) {
            setQuantity((q) => (q - 1))
        }
    }

    //fix bug with add more items from the cart
    useEffect(() => {
        const updateCart = () => {
            let newCart = []
            for (let i = 0; i < appState.review.length; i++) {
                for (let j = 0; j < appState.review[i].quantity; j++) {
                    newCart.push(appState.review[i].name)
                }

            }
            return newCart
        }

        if(appState.review.length){
            const newCart = updateCart()
    
            setAppState((a) => ({
                ...a,
                cart: newCart
            }))
        }
    },[total])

    //there's a bug with this useffect
    useEffect(() => {
        const updateTotal = () => {
            let newTotal = 0
            for (let i = 0; i < appState.review.length; i++) {
                newTotal += appState.review[i].quantity

            }
            return newTotal

        }

        const newTotal = updateTotal()
        if(newTotal){
            setTotal(newTotal)
        }
        
    },[appState.review])
    // console.log(total)

    useEffect(() => {
        const updateReview = () => {
            const name = product.name
            const elementsIndex = appState.review.findIndex(product => product.name === name)
            let newArray = [...appState.review]
            // console.log(appState.review)
            if (newArray.length && elementsIndex>=0) {
                newArray[elementsIndex].quantity = quantity
                setAppState((a) => (
                    {
                        ...a,
                        review: newArray
                    }
                ))
            }

        }
        updateReview()
    }, [quantity])

    // console.log(appState.cart)
    useEffect(() => {


        const fetchData = async () => {
            try {
                const productRes = await apiClient.fetchProductByName({ productName: product })
                if (productRes?.data?.productResponse[0].img) {
                    setImg(productRes.data.productResponse[0].img)
                }
                if (productRes?.data?.productResponse[0].price) {
                    setPrice(productRes.data.productResponse[0].price)
                }
                let obj = {}
                obj['name'] = product.name
                obj['price'] = productRes.data.productResponse[0].price
                obj['img'] = productRes.data.productResponse[0].img
                obj['quantity'] = quantity

                let copy = true
                // review = [{name:"pizza",'price':2,'img':imgurl,'quantity':3}]
                // let existReview = appState.review.find((review) => review.name === product.name)
                // console.log(existReview)
                for (let i = 0; appState.review.length; i++) {
                    if (appState.review[i].name === product.name) {
                        copy = false
                    }
                }
                if (copy) {
                    setAppState((a) => (
                        {
                            ...a,
                            review: [...a.review, obj]
                        }
                    ))
                }


            } catch (err) {
                setError(err)
            }

        }

        fetchData()
    }, [])

    return (
        <Card>
            {/* <CardMedia image={img} alt={product.name} height={200} width={150}></CardMedia> */}
            <CardContent>
                {/* <CardMedia image={img} alt={product.name}></CardMedia> */}

                <Grid container direction="row">
                    <Grid item xs={4} container direction="row">
                        <img src={img} width={150} height={150} alt={product.name}></img>
                        <Box p={8}>
                            <Typography>{product.name}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box marginTop={8}>
                            <Typography>Total: ${product.quantity * price}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box border={1}  marginTop={8} display="flex" alignItems='center' justifyContent="space-evenly">
                            <IconButton onClick={() => decrement()}><RemoveIcon/></IconButton>
                            {/* <input type="image" onClick={() => decrement()} id="image" height="40px" width="40px" alt="minus sign" src={minus_sign}></input> */}
                            <Typography>{quantity}</Typography>
                            <IconButton onClick={() => increment()}><AddIcon/></IconButton>
                            {/* <input type="image" onClick={() => increment()} id="image" height="40px" width="40px" alt="plus sign" src={plus_sign}></input> */}
                        </Box>
                    </Grid>
                </Grid>

            </CardContent>

        </Card>

    )
}
