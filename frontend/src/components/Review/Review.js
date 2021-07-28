import { Typography, List, ListItem, ListItemText, Paper, ImageListItem, Button } from "@material-ui/core";
import { useAppStateContext } from '../../contexts/appStateContext';
import { useNavigate } from "react-router-dom";


export default function Review() {
    const { appState, setAppState } = useAppStateContext()
    const navigate = useNavigate()
    let total = 0
    for (let i = 0; i < appState.review.length; i++) {
        total += (appState.review[i].price * appState.review[i].quantity)
    }

    return (
        <>

            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <List>
                {appState.review.map((item) => (
                    <ListItem key={item}>
                        <ImageListItem key={item.img} style={{ marginRight: '8px' }}>
                            <img
                                srcSet={item.img}
                                alt={item.name}
                                loading="lazy"
                                width={150}
                                height={150}
                            />
                        </ImageListItem>
                        <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`}></ListItemText>
                        <Typography variant="body2">Total: ${item.quantity * item.price}</Typography>
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        ${total}
                    </Typography>
                </ListItem>
            </List>
            {/* <Button onClick={() => { navigate('/checkout') }}>Checkout</Button> */}
        </>
    )
}