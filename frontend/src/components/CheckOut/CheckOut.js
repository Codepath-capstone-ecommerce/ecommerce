import { Paper, Stepper, Step, StepLabel, Typography, Button } from "@material-ui/core"
import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import PaymentForm from "../PaymentForm/PaymentForm";
import AddressForm from "../AddressForm/AddressForm";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
        marginRight:theme.spacing(40),
        marginLeft:theme.spacing(40),
        padding: theme.spacing(2)
    },
}));

const steps = ["Delivery Info", "Payment Methods"]

export default function CheckOut() {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles();
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    return (
        <>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Checkout</Typography>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            {activeStep === 0 ? <AddressForm /> : <PaymentForm></PaymentForm>}
                            <div>
                                {activeStep===0? <Button onClick={() => { navigate('/cart') }}>Back to Cart</Button>:
                                <Button onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>}
                                
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Paper>
        </>
    )
}