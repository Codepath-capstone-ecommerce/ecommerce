import { useAppStateContext } from '../../contexts/appStateContext';
import { Container, Button, Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from "react"
import axios from "axios"
import CartCard from '../CartCard/CartCard';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { appState, setAppState, vendorState, setvendorState } = useAppStateContext()
    const [isCartFilled, setCart] = useState(false)
    const navigate = useNavigate()
    // if (appState.cart.length !==0){
    //     setCart(true)
    // }

    const emptyCart = () => {
        setAppState((a) => (
            {
                ...a,
                cart: [],
                review:[]
            }
        ))
    }


    // useEffect (() =>{
    //     const updateCart = () =>{
    //         let newCart = []
    //         console.log(appState.review)
    //         for (let i = 0; i < appState.review.length; i++) {
    //             for (let i = 0; i < appState.review[i].quantity; i++){
    //                 newCart.push(appState.review[i].name)
    //             }
                
    //         }
    //         console.log(newCart)
    //         return newCart
    //     }
    
    //     const newCart = updateCart()

    //     setAppState((a) => ({
    //         ...a,
    //         cart:newCart
    //     }))

    // },[appState.review.length])

    const formatCart = () => {
        const obj = {}
        for (let i = 0; i < appState.cart.length; i++) {
            if (appState.cart[i] in obj) {
                obj[appState.cart[i]] += 1
            } else {
                obj[appState.cart[i]] = 1
            }
        }

        return obj
    }

    // console.log(prices)
    const obj = formatCart()
    const items = []
    for (const [key, value] of Object.entries(obj)) {
        items.push({ name: key, quantity: value });
    }

    const cart = []
    for (const [key, value] of Object.entries(obj)) {
        let obj = {}
        obj[key] = value
        cart.push(obj);
    }


    const createOrder = async () => {
        // console.log(cart)
        const { data, error } = await apiClient.createOrder(
            {
                "cart": {
                    address: "123 Street",
                    products: cart
                }
            }
        )
        console.log(vendorState.currentOrders)
        setvendorState(oldState => ({ currentOrders: [...oldState.currentOrders, data] }))
        emptyCart()
        // if (error){
        //   setErrors((e) => ({ ...e, form:error}))
        // }
    }
    // console.log(items)
    // console.log(appState.cart1)
    return (
        <Container>
            <NavBar></NavBar>
            <Grid>
            <Typography>Your Cart</Typography>
            <Button onClick={()=>{navigate('/menu')}}>Add more items</Button>
            </Grid>
            <Grid container>
                {items.length === 0 ? "Cart is empty" : items.map((item, idx) => (
                    <CartCard product={item} key={idx}></CartCard>
                ))}
            </Grid>
            <Button onClick={createOrder}>Place Order</Button>
            <Button onClick={emptyCart}>Clear Cart</Button>
            <Button onClick={()=>{navigate('/checkout')}}>Checkout Order</Button>
        </Container>


    )
}