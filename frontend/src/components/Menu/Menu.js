import MenuCard from "../MenuCard/MenuCard"
import axios from "axios"
import { useState, useEffect } from "react"
import { Button, colors, ListItem, ListItemText, List, Card } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../NavBar/NavBar"
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from '../../contexts/appStateContext';


//class should import appstate that contains products
//loop through each product to create a menucard
export default function Menu() {
    const { appState, setAppState } = useAppStateContext()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProduct] = useState([])

    const checkout = () => {
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
        // if(products.length){
        //     for(let i =0;i<products.length;i++){
        //         let obj = {}
        //         obj[products[i].name]=products[i].price
        //         setAppState((a)=>({
        //             ...a,
        //             prices: [...a.prices,obj]
        //         }))
        //     }
        // }
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            <br></br>
            <List>
                <Card>
                    <ListItem>
                        <ListItemText>
                            Pizzas
                        </ListItemText>
                    </ListItem>
                </Card>
                <Card>
                    <ListItem>
                        <ListItemText>
                            Drinks
                        </ListItemText>
                    </ListItem>
                </Card>
                <Card>
                    <ListItem>
                        <ListItemText>
                            Desserts
                        </ListItemText>
                    </ListItem>
                </Card>


            </List>
            <Grid
                container
                direction="row"
                spacing={10}
                alignItems="center"
                justify="space-evenly"
            >
                {products.map((product, idx) => (
                    <MenuCard product={product} key={idx} />
                ))}
            </Grid>
        </div>

    )
}