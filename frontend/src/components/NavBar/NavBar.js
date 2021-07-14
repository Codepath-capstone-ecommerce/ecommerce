import { Button, Box } from "@material-ui/core"
import { useNavigate, Link } from "react-router-dom"
export default function NavBar(){
    return(
        <Box display="flex" justifyContent="space-between">
            <img src = "http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" alt = "logo" width="40px" height="40px"></img>
            <Box>
                <Button variant="outlined">Menus</Button>
                <Button variant="outlined">Our Story</Button>
                <Button variant="outlined" >Login</Button>
                <Button variant="outlined">Order Now</Button>
            </Box>
        </Box>

    )
}