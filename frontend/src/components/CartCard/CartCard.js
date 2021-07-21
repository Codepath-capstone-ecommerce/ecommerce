import { Card, Typography, Box, Button,CardContent } from "@material-ui/core"
import { useAppStateContext } from '../../contexts/appStateContext';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

//write function that can send products to a cart once buttons are clicked
export default function CartCard({ product }) {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            try {
                const productRes = await apiClient.fetchProductByName({productName:product})
                console.log(productRes.data.productResponse[0])
                if (productRes?.data?.productResponse[0].img) {
                    setImg(productRes.data.productResponse[0].img)
                }

            } catch (err) {
                console.log({ err })
                setError(err)
            }

        }

        fetchData()
    }, [])

    return (
        <Card>
            <CardContent>
                <img src={img}></img>
                <Typography>Item: {product.name}</Typography>
                <Typography>Quantity: {product.quantity}</Typography>
            </CardContent>

        </Card>

    )
}
