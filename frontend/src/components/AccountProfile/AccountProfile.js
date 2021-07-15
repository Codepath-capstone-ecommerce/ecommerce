import { Typography, Card, Link, Checkbox, Box, FormGroup, FormControlLabel } from "@material-ui/core"
import NavBar from "../NavBar/NavBar"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 80
    },
    box: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    }
}));
export default function AccountProfile() {
    const classes = useStyles()
    return (
        <div>
            <NavBar></NavBar>
            <Box className={classes.root}>
                <Typography>Hey, Max!</Typography>
                <Typography>Welcome to your account dashboard</Typography>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography>Your Orders</Typography>
                <Link>View All</Link>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography> Contact Info</Typography>
                
                    <Card>
                        <Box p ={2}>
                            <Typography>Name</Typography>
                            <Typography>Email</Typography>
                            <Link>Edit</Link>
                        </Box>
                    </Card>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography>Saved Addresses </Typography>
                <Card>
                    <Box p ={3}>
                        <Typography>You don't have any saved addresses</Typography>
                    </Box>                
                </Card>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography>Saved Payments </Typography>
                <Card>
                    <Box p={3}>
                        <Typography>You don't have any saved methods</Typography>
                    </Box>
                </Card>
            </Box>
            <br></br>

            <Box className={classes.root}>
                <Typography>Email Notification</Typography>
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