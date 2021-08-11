import MenuCard from "../MenuCard/MenuCard"
import axios from "axios"
import { useState, useEffect } from "react"
import { Button, colors, ListItem, ListItemText, List, Card, CardActions, Box } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../NavBar/NavBar"
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from '../../contexts/appStateContext';
import apiClient from '../../services/apiClient';
import Footer from '../Footer/Footer'

//class should import appstate that contains products
//loop through each product to create a menucard
export default function Menu() {
    const { appState, setAppState } = useAppStateContext()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProduct] = useState([])
    const [active, setActive] = useState({
        "All":true,
        "Pizza":false,
        "Drink":false,
        "misc":false
    })
    const categories = ['All','Pizza', 'Drink', 'misc']
    const checkout = () => {
        navigate('/cart')
    }

    const getCat = (e) => {
        let obj = {}
        for (const [key, value] of Object.entries(active)) {
            if( key === e.target.innerHTML){
                obj[key] = true
            }
            else{
                obj[key] = false
            }
        }
        setActive(obj)
        if (e.target.innerHTML !== 'All'){
            const fetchData = async () => {
                try {
                    const productRes = await apiClient.fetchProductsByCategory({ category: e.target.innerHTML })
                    if (productRes?.data?.products) {
                        setProduct(productRes.data.products)
                    }
                } catch (err) {
                    setError(err)
                }
            }
            fetchData()
        }else{
            fetchData()
        }
    }

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

    
    // console.log(active)
    return (
        <div>
            <NavBar></NavBar>
            <br></br>
            <Grid container justifyContent="space-around" style={{marginBottom:10 }}>
                <Grid item xs={2}>
                    {categories.map((cat, idx) => (
                        <Box my={2}>
                            <Card key={idx}>
                                {active[cat] ?
                                    <CardActions style={{ padding:'0px', backgroundColor: "#2ed9fb", borderRadius: "0.25em", borderColor: "#000", border: `3px solid` }}>
                                        <Button fullWidth style={{ padding:'8px'}} onClick={getCat}>{cat}</Button>
                                    </CardActions> :
                                    <CardActions style={{ padding:'0px', borderRadius: "0.25em", borderColor: "#000", border: `3px solid` }}>
                                        <Button fullWidth style={{ padding:'8px'}} onClick={getCat}>{cat}</Button>
                                    </CardActions>}
                            </Card>
                        </Box>
                    ))}
                </Grid>
                <Grid
                    item
                    xs={8}
                    container
                >
                    {products.map((product, idx) => (
                        <Box mx={2}>
                            <MenuCard product={product} key={idx} />
                        </Box>
                    ))}
                </Grid>
               
            </Grid>
            <Footer/>
        </div>

    )
}