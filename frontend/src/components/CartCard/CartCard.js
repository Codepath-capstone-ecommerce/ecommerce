import minus_sign from "../../assets/minus_sign.svg"
import plus_sign from "../../assets/plus_sign.svg"
import { Card, Typography, Box, Button, CardContent, CardMedia } from "@material-ui/core"
import { useAppStateContext } from '../../contexts/appStateContext';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

//write function that can send products to a cart once buttons are clicked
export default function CartCard({ product }) {
    const { appState, setAppState } = useAppStateContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState([])
    const [price, setPrice] = useState(0)
    const check = appState.review[appState.review.findIndex(products => products.name === product.name)]
    const initialize = check ? check.quantity : product.quantity
    const [quantity, setQuantity] = useState(initialize);


    const increment = () => {
        setQuantity((q) => (q + 1))
    }


    const decrement = () => {
        if (quantity !== 0) {
            setQuantity((q) => (q - 1))
        }
    }

    //there's a bug with this useffect
    // useEffect(() => {
    //     const updateCart = () => {
    //         let newCart = []
    //         console.log(appState.review)
    //         for (let i = 0; i < appState.review.length; i++) {
    //             for (let j = 0; j < appState.review[i].quantity; j++) {
    //                 newCart.push(appState.review[i].name)
    //             }

    //         }
    //         return newCart
    //     }

    //     const newCart = updateCart()
    //     console.log(newCart)

    //     setAppState((a) => ({
    //         ...a,
    //         cart: newCart
    //     }))
    // },[appState.review])

    useEffect(() => {
        const updateReview = () => {
            const name = product.name
            const elementsIndex = appState.review.findIndex(product => product.name === name)
            let newArray = [...appState.review]
            if (newArray.length) {
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
                <img src={img} width={150} height={150} alt={product.name}></img>
                <div>
                    <Typography>Item: {product.name}</Typography>
                    <Typography>Total: ${product.quantity * price}</Typography>
                    <Box display="flex" flexDirection="row" justifyContent="center">
                        <input type="image" onClick={() => decrement()} id="image" height="25px" width="25px" alt="minus sign" src={minus_sign}></input>
                        <Typography>{quantity}</Typography>
                        <input type="image" onClick={() => increment()} id="image" height="25px" width="25px" alt="plus sign" src={plus_sign}></input>
                    </Box>
                </div>

            </CardContent>

        </Card>

    )
}
