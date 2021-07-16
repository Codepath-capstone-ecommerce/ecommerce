import MenuCard from "../MenuCard/MenuCard"
import axios from "axios"
import { useState, useEffect } from "react"
import { colors } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../NavBar/NavBar"


//class should import appstate that contains products
//loop through each product to create a menucard
export default function Menu() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProduct] = useState([])

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
        console.log(products)
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
        </Grid>
        </div>
        
    )
}