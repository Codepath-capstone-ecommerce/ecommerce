import { useState } from "react"
import { Card, Typography, Box, Button, IconButton } from "@material-ui/core"
import { useAppStateContext } from '../../contexts/appStateContext';
import { Link } from "react-router-dom"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

//write function that can send products to a cart once buttons are clicked
export default function MenuCard({ product }) {
    const { appState, setAppState } = useAppStateContext()
    // console.log(appState)
    const [quantity, setQuantity] = useState(0);

    const increment = () => {
        setQuantity(quantity + 1)
    }

    const decrement = () => {
        if (quantity !== 0) {
            setQuantity(quantity - 1)
        }
    }

    let obj = {}
    obj[product.name] = product.price

    const addToCart = () => {

        for (let i = 0; i < quantity; i++) {
            setAppState((a) => (
                {
                    ...a,
                    cart: [...a.cart, product.name]
                }
            ))
        }
        setQuantity(0)
    }
    console.log(appState.cart)

    return (
        <Box mt={2} mb={2}>
            <Card >
                <Box display="flex" flexDirection="column" p={5}>
                    <img src={`${product.image}`} alt={`${product.name}`} width={150} height={130}></img>
                    <br></br>
                    <Box>
                        <Box display="flex" flexDirection="column">
                            <span className="name">{`${product.name}`}</span>
                            <br></br>
                            <span>Price: ${`${product.price}`}</span>
                            <span>Calories: {`${product.cals}`}</span>
                            <br></br>
                        </Box>
                        {appState.first_name ? <Box border={1} marginTop={1} display="flex" alignItems='center' justifyContent="space-evenly">
                            <IconButton onClick={() => decrement()}><RemoveIcon /></IconButton>
                            {/* <input type="image" onClick={() => decrement()} id="image" height="40px" width="40px" alt="minus sign" src={minus_sign}></input> */}
                            <Typography>{quantity}</Typography>
                            <IconButton onClick={() => increment()}><AddIcon /></IconButton>
                            {/* <input type="image" onClick={() => increment()} id="image" height="40px" width="40px" alt="plus sign" src={plus_sign}></input> */}
                        </Box> : <div></div>}
                        <br></br>
                        {/* Have a terninary operator to only have cart function if a user is logged in */}
                        {appState.first_name ? <Box><Button variant="outlined" disabled={quantity === 0} onClick={addToCart}>Add to Cart</Button></Box> : <div></div>}
                    </Box>
                </Box>
            </Card>
        </Box>

    )
}
