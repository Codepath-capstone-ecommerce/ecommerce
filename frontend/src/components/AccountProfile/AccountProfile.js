import { Typography, Card, Link, Checkbox, Box } from "@material-ui/core"
import NavBar from "../NavBar/NavBar"
export default function AccountProfile(){
    return (
        <div>
            <NavBar></NavBar>
            <Typography>Hey, Max!</Typography>
            <Typography>Welcome to your account dashboard</Typography>
            <br></br>
            <br></br>
            <Typography>Your Orders</Typography>
            <Link>View All</Link>
            <Typography> Contact Info</Typography>
            <Card>
                <Typography>Name</Typography>
                <Typography>Email</Typography>
                <Link>Edit</Link>
            </Card>
            <Typography>Saved Addresses </Typography>
            <Card>
                <Typography>You don't have any saved addresses</Typography>
            </Card>
            <Typography>Saved Payments </Typography>
            <Card>
                <Typography>You don't have any saved methods</Typography>
            </Card>
            <Typography>Email Notification</Typography>
            <Card>
                <Checkbox label="Send Offers"></Checkbox>
                <Checkbox label="Push Notificattions"></Checkbox>
                <Checkbox label="Order Receipts"></Checkbox>
            </Card>
        </div>
    )
}