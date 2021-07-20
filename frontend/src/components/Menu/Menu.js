import MenuCard from "../MenuCard/MenuCard"
import axios from "axios"
import { useState, useEffect } from "react"
import { Button, colors } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../NavBar/NavBar"
import { useNavigate } from "react-router-dom";


//class should import appstate that contains products
//loop through each product to create a menucard
export default function Menu() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProduct] = useState([])

    const checkout = () =>{
        navigate('/cart')
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const productRes = await axios.get("http://localhost:3001/products/list")
                if (productRes?.data?.products) {
                    setProduct(productRes.data.products)
                }

            } catch (err) {
                console.log({ err })
                setError(err)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])
    return (
        <div>
        <NavBar></NavBar>
        <br></br>
        <Grid
            container
            direction="row"
            spacing={10}
            alignItems="center"
            justify="space-evenly"
           >
            {products.map((product) => (
                <MenuCard product={product} />
            ))}
            <Button onClick={checkout}>Checkout Cart</Button>
        </Grid>
        </div>
        
    )
}