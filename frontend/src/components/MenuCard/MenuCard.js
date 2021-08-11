import { useState } from "react"
import { Card, Typography, Box, Button, IconButton } from "@material-ui/core"
import { useAppStateContext } from '../../contexts/appStateContext';
import { Link } from "react-router-dom"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import './MenuCard.css';

const useStyles = makeStyles(() => ({
    menuCardHover:{
        borderRadius: 20,
        '&:hover': {
            // backgroundColor: "#000",
            boxShadow:23,
            elevation:24
         }
    },
    buttonHover: {
      '&:hover': {
        color: '#6CC161',
        // backgroundColor: "#f00"
     }
    },
    cardHover:{
        transition: "transform 0.15s ease-in-out",
        '&:hover': {
            transform: "scale3d(1.05, 1.05, 1)",
            raised: true
         }
    },
    
  }
));

  
//write function that can send products to a cart once buttons are clicked
export default function MenuCard({ product }) {
    const classes = useStyles()
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

    return (
        <Box mt={2} mb={2} className={classNames("make-it-slow",classes.menuCardHover)} >
            <Card className={classes.cardHover} style={{ borderRadius: 20, borderColor: "#2EDBFD", backgroundColor: "#2CDBFD",
        border: `4px solid`}}>
                <Box display="flex" flexDirection="column" p={5}  >
                    <img style={{ backgroundColor: "#fff", borderRadius: 20, borderColor: "#000", border: `3px solid`}} src={`${product.image}`} alt={`${product.name}`} width={150} height={130}></img>
                    <br></br>
                    <Box>
                        <Box display="flex" flexDirection="column" style={{ backgroundColor: "#fff", borderRadius: 20, borderColor: "#000", border: `3px solid`, padding:10}}>
                            <Typography style={{fontWeight: 'bold'}}className="name">{`${product.name}`}</Typography>
                            <br></br>
                            <Typography className="name">Price: ${`${product.price}`}</Typography>
                            <Typography className="name">Calories: {`${product.cals}`}</Typography>
                            <br></br>
                        </Box>
                        {appState.first_name ? <Box border={1} marginTop={1} display="flex" alignItems='center' justifyContent="space-evenly" style={{ borderRadius: 20, borderColor: "#000", backgroundColor: "#fff",
        border: `3px solid`,}}>
                            <IconButton onClick={() => decrement()}><RemoveIcon /></IconButton>
                            {/* <input type="image" onClick={() => decrement()} id="image" height="40px" width="40px" alt="minus sign" src={minus_sign}></input> */}
                            <Typography>{quantity}</Typography>
                            <IconButton onClick={() => increment()}><AddIcon  /></IconButton>
                            {/* <input type="image" onClick={() => increment()} id="image" height="40px" width="40px" alt="plus sign" src={plus_sign}></input> */}
                        </Box> : <div></div>}
                        <br></br>
                        {/* Have a terninary operator to only have cart function if a user is logged in */}
                        {appState.first_name ? <Box style={{display: "flex",  justifyContent: "center", alignItems: "center"  }} ><Button style={{justifyContent: 'center', borderRadius: 20, borderColor: "#000", backgroundColor: "#fff",
        border: `3px solid`}}disabled={quantity === 0} onClick={addToCart}  className={classes.buttonHover}>Add to Cart</Button></Box> : <div></div>}
                    </Box>
                </Box>
            </Card>
        </Box>

    )
}
