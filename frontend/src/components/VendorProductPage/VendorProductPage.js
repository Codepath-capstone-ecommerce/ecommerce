import MenuCard from "../MenuCard/MenuCard"
import axios from "axios"
import { useState, useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../NavBar/NavBar"
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from '../../contexts/appStateContext';
import NewOrder from "../NewOrder/NewOrder";
import PersistentDrawerLeft from "../Practice/Practice";


//class should import appstate that contains products
//loop through each product to create a menucard
export default function VendorProductPage() {
    const { appState, setAppState } = useAppStateContext()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProduct] = useState([])



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
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <Box display="flex">
            <PersistentDrawerLeft name={'Products'} />
            <br></br>
            <Box m={7}>
                <Box my={3}>
                    <NewOrder />
                </Box>
                <Grid container justifyContent="space-around" mx={3}>
                    <Grid
                        item
                        container
                    >
                        {products.map((product, idx) => (
                            <Box mx={2}>
                                <img src={`${product.image}`} alt={`${product.name}`} width={150} height={130}></img>
                                <br></br>
                                <Box display="flex" flexDirection="column">
                                    <span className="name">{`${product.name}`}</span>
                                    <br></br>
                                    <span>Price: ${`${product.price}`}</span>
                                    <span>Calories: {`${product.cals}`}</span>
                                    <br></br>
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Box>

    )
}