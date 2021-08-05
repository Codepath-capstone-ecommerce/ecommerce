import {Typograph, Button, Divider, Typography} from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js"
import { loadStripe} from '@stripe/stripe-js'
import Review from '../Review/Review'
import apiClient from '../../services/apiClient';

//grab stripe promise with public key  (put into env file later)
const stripePromise = loadStripe('pk_test_51JHVxDAT6YdOUgSd9z0elQAkI6zeC8p4dd8YBYk2nTyIiGumxkBUqPXnyQPdNGKhfVAwTCmgoWUVl57H5EBrIOsL00J3lY34QJ')
export default function PaymentForm({ checkoutToken, setPayment }) {

    const handleSubmit = async (event,elements,stripe) => {
        event.preventDefault();

        console.log('here')
        if(!stripe || !elements) return ;

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type:'card', card:cardElement})

        if(error){
            console.log(error)
        }else{
            alert("success")
            const orderData = {
                line_items: [],
                customer:"",
                shipping:{
                    name:"Primary",
                    street:'',
                    postal_zip_code:""
                }
            }
        }
    }

    const handleOnInputChange = (event) => {
        if (event.complete){
            setPayment(true)
        }else{
            setPayment(false)
        }
    }

    return (
        <>
        <Review></Review>
        <Typography variant="h6">Payment method</Typography>
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({ elements, stripe }) => (
                    <form onSubmit={(e) => handleSubmit(e,elements,stripe)}>
                        <CardElement onChange={handleOnInputChange}/>
                        <br/> <br/>
                        {/* <div style={{display:'flex', justifyContent: 'space-between'}}>
                            <Button>Back</Button>
                            <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                Pay
                            </Button>

                        </div> */}
                        
                    </form>
                )}
            </ElementsConsumer>
        </Elements>
        </>
    )
}