import { useAppStateContext } from '../../contexts/appStateContext';
import { Button } from '@material-ui/core';

export default function Cart() {
    const { appState } = useAppStateContext()
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

    const printOb = () => {
        console.log(obj)
    }

    return (
        <div>
            {items.length === 0 ? "Cart is empty" : items.map((item, idx) => (
                <div key={idx}>Item:{item.name} Quantity:{item.quantity}</div>
            ))}
            <Button onClick={printOb}>Place Order</Button>
        </div>


    )
}