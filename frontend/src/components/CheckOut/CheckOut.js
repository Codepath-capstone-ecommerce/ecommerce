import { Paper, Stepper, Step, StepLabel, Typography, Button, Box, Divider } from "@material-ui/core"
import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import PaymentForm from "../PaymentForm/PaymentForm";
import AddressForm from "../AddressForm/AddressForm";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from '../../contexts/appStateContext';
import apiClient from '../../services/apiClient';
import Confirmation from "../Confirmation/Confirmation";
import classNames from 'classnames';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    stepIcon: {
        color: "#2bdbfd"
    },
    icon: {
        color: "#2bdbfd !important"
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        marginRight: theme.spacing(40),
        marginLeft: theme.spacing(40),
        padding: theme.spacing(2)
    },
    step: {
        background: '#2ed9fb',
    },
    title: {
        fontSize: 30,
        fontWeight: "900"
    },
    navbar: {
        zIndex: "2 !important"
    },
    overlay: {
        position: 'absolute',
        color: 'white',
        paddingTop: "15px",
        paddingRight: "3px"
    },
    overlay2: {
        position: 'absolute',
        color: 'white',
    },
    mainBackground: {
        backgroundColor: "#000",
        width: '100%',
        height: '100%',
    },
    blue: {
        backgroundColor: "#2EDBFD",
        paddingTop: 2,
        paddingBottom: 2,
    },
    outlinePaper: {
        borderRadius: 20, borderColor: "#2EDBFD", padding: 10,
        border: `4px solid`,
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        marginRight: theme.spacing(40),
        marginLeft: theme.spacing(40),
        padding: theme.spacing(2)
    },
    notchedOutline: {
        borderWidth: "2px",
        borderColor: "black !important"
    }
}));

const steps = ["Delivery Info", "Payment Methods"]

export default function CheckOut() {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles();
    const { appState, setAppState, vendorState, setvendorState } = useAppStateContext()
    const [complete, setComplete] = useState(false)
    const [payment, setPayment] = useState(false)
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        address: "",
        email: "",
        postal_code: ""
    })

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
    // console.log(vendorState)
    // console.log(form.address)
    const createO = async () => {
        // console.log(form.address)
        const { data, error } = await apiClient.createOrder(
            {
                "cart": {
                    address: form.address,
                    products: cart
                }
            }
        )
        setvendorState(oldState => ({ currentOrders: [...oldState.currentOrders, data] }))
        emptyCart()
        // if (error){
        //   setErrors((e) => ({ ...e, form:error}))
        // }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = (e) => {
        if (e.target.innerHTML === "Finish") {
            createO();
            emptyCart();
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <>
            <div className={classes.mainBackground}>

                <Box align="center" p={4}
                    display="flex"
                    justifyContent="center"
                    // position= "absolute"
                    alignItems="center"
                    top="10px"
                    right="50px">
                    <Typography align="left" style={{ zIndex: "4 !important" }} className={classNames("title-font", classes.title, classes.overlay)} >
                        Simply Pizza .
                    </Typography>
                    <Typography align="left" style={{ zIndex: "5 !important" }} className={classNames("shadow", "title-font", classes.title, classes.overlay2)} >
                        Simply Pizza .
                    </Typography>
                </Box>
                <Divider className={classes.blue} />
                <Paper className={classes.outlinePaper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => (
                                <Step key={index}>
                                    <StepLabel className={classes.stepIcon}
                                        StepIconProps={{
                                            classes: {
                                                active: classes.icon,
                                                completed:classes.icon
                                            }
                                        }}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Confirmation></Confirmation>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={() => navigate('/accountProfile')}>Go to profile</Button>
                            </div>
                        ) : (
                            <div>
                                {activeStep === 0 ? <AddressForm form={form} setForm={setForm} setComplete={setComplete} /> : <PaymentForm setPayment={setPayment}></PaymentForm>}
                                <div>
                                    {activeStep === 0 ? <Button onClick={() => { navigate('/cart') }}>Back to Cart</Button> :
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>}
                                    {activeStep === steps.length - 1 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                            disabled={!payment}
                                        >Finish
                                        </Button> :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                            disabled={!complete}
                                        > Next
                                        </Button>}
                                    {/* <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                    disabled={!complete}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button> */}
                                </div>
                            </div>
                        )}
                    </div>
                </Paper>
                <Divider className={classes.blue} />
            </div>
        </>
    )
}