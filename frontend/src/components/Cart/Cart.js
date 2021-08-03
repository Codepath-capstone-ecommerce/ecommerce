import { useAppStateContext } from '../../contexts/appStateContext';
import { Container, Button, Typography, Card, CardContent, CardMedia, Grid, Box } from '@material-ui/core';
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

    // console.log(appState.cart)
    const emptyCart = () => {
        setAppState((a) => (
            {
                ...a,
                cart: [],
                review: []
            }
        ))
    }

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

    return (
        <Container>
            <NavBar></NavBar>
            <Grid>
                <Typography>My Cart</Typography>
                <Button onClick={() => { navigate('/menu') }}>Add more items</Button>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        Item
                    </Grid>
                    <Grid item xs={4}>
                        Price
                    </Grid>
                    <Grid item xs={4}>
                        Quantity
                    </Grid>
                </Grid>
            </Grid>
            <Grid >
                {items.length === 0 ? "Cart is empty" : items.map((item, idx) => (
                    <CartCard product={item} key={idx}></CartCard>
                ))}
            </Grid>
            <Button onClick={emptyCart}>Clear Cart</Button>
            <Button onClick={() => { navigate('/checkout') }}>Checkout Order</Button>
        </Container>


    )
}