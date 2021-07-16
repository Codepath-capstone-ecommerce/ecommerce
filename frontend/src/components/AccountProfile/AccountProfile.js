import { Typography, Card, Link, Checkbox, Box, FormGroup, FormControlLabel } from "@material-ui/core"
import NavBar from "../NavBar/NavBar"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 144
    },
    box: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding:16
    }
}));
export default function AccountProfile() {
    const classes = useStyles()
    return (
        <div>
            <NavBar></NavBar>
            <Box className={classes.root}>
                <Typography variant="h1" component="h2">Hey, Max!</Typography>
                <Typography>Welcome to your account dashboard</Typography>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography variant="h5">Your Orders</Typography>
                <Link>View All</Link>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography variant="h5"> Contact Info</Typography>
                
                    <Card>
                        <Box p={4}>
                            <Box width={75}>
                                <Typography>Name</Typography>
                                <Typography>Email</Typography>
                                <Link>Edit</Link>
                            </Box>
                        </Box>
                    </Card>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography variant="h5">Saved Addresses </Typography>
                <Card>
                    <Box p ={3}>
                        <Typography>You don't have any saved addresses</Typography>
                    </Box>                
                </Card>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography variant="h5">Saved Payments </Typography>
                <Card>
                    <Box p={3}>
                        <Typography>You don't have any saved methods</Typography>
                    </Box>
                </Card>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography variant="h5">Email Notification</Typography>
                <Card>
                    <Box className={classes.box}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox name="checkedA" />}
                                label="Send Offers"
                            />
                            <FormControlLabel
                                control={<Checkbox name="checkedB" />}
                                label="Push Notifications"
                            />
                            <FormControlLabel
                                control={<Checkbox name="checkedB" />}
                                label="Order Receipts"
                            />
                        </FormGroup>
                    </Box>

                </Card>
            </Box>
        </div>
    )
}