import { useAppStateContext } from '../../contexts/appStateContext';
import { Button, Typography, Card,CardContent,CardMedia } from '@material-ui/core';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from "react"
import axios from "axios"
import CartCard from '../CartCard/CartCard';
import NavBar from '../NavBar/NavBar';

export default function Cart() {
    const { appState, setAppState, vendorState, setvendorState } = useAppStateContext()
    const [isCartFilled, setCart] = useState(false)
    
    // if (appState.cart.length !==0){
    //     setCart(true)
    // }

    const emptyCart = () =>{
        setAppState((a) => (
            {
              ...a,
              cart:[]
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
        console.log(data)
        // setvendorState(oldState => ({ currentOrders: [...oldState.currentOrders, data.orderDetail[0]] }))
        emptyCart()
        // if (error){
        //   setErrors((e) => ({ ...e, form:error}))
        // }
    }

    // <Card key={idx}>
//     <CardContent>
//     <Typography>Item: {item.name}</Typography>
//     <Typography>Quantity: {item.quantity}</Typography>
// </CardContent>

// </Card>

    return (
        <div>
            <NavBar></NavBar>
            <Typography>Your Cart</Typography>
            {items.length === 0 ? "Cart is empty" : items.map((item, idx) => (
                <CartCard product={item}></CartCard>
            ))}
            <Button onClick={createOrder}>Place Order</Button>
            <Button onClick={emptyCart}>Clear Cart</Button>
        </div>


    )
}