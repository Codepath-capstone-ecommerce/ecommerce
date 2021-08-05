import { useAppStateContext } from '../../contexts/appStateContext';
import { Container, Button, Typography, Card, CardContent, CardMedia, Grid, Box } from '@material-ui/core';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"
import CartCard from '../CartCard/CartCard';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#2ed9fb',
    }
}));

export default function Cart() {
    const { appState, setAppState, vendorState, setvendorState } = useAppStateContext()
    const [isCartFilled, setCart] = useState(false)
    const classes = useStyles()
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
                {items.length === 0 ? <Card>
                <Box border={1} p={5} display='flex' flexDirection='column' justifyContent='center' alignItems='center'><img alt="Pizza box" src='data:image/jpeg;base64,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1ocrqeSAt/ZcQnZwErQ4fgLfcoqp0BxqL7OSmnG4X1XH2OaB+JdpRRSw9OWqJY16kdGfPtXQ4rE5jqjDpSI3h/1QL72BG2MvA27VV+l8BPNzx1ER3g3BH9pDvBfQKsVVJHINWWNjxwe0OHcVVqdm0p9D2Vdyd5HEKbGaZ/2VYW/dm2e3nAHH+5Zn0bW8p0cEn34vId7P/pdAr+T3CpelRxN64daL/pkLX6vkepL61NU1MB6nBwHgHfiVOXZDX7J/L6qzHxIkRTRW2GYAebIdb8Rue5y84wL00w/hSfkKvz8nuLRfs9dFMBumaWEjtIffvCh8Qo8biY9k9CJGlpbrQeVkRa9mOcfAKpPszEJ7PwZ0rPRkPo3K1tIHOIAaXXJ3ZlTeiOjEmKyieYOZQxuyGx1U4GxA+7xdu2DO5GNoBoNUVmqKtskVJE8lzXBzH1D9uqAbENG93sGdyO6U0DI2Njja1rWgNa1osGgZAADYFsUMKuNzl5EtfE91QiKeBrGNjjaGtaA1rWiwaALAADYFeRFfKIREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH/9k='/>
                Your cart is empty</Box></Card> : items.map((item, idx) => (
                    <CartCard product={item} key={idx}></CartCard>
                ))}
            </Grid>
            <Button onClick={emptyCart}>Clear Cart</Button>
            <Button className={appState.cart.length===0?'':classes.root} disabled={appState.cart.length===0} onClick={() => { navigate('/checkout') }}>Checkout Order</Button>
        </Container>


    )
}