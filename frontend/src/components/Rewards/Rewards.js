import { Typography, LinearProgress, Box, Link, Divider, Card, CardMedia, Button } from "@material-ui/core"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar"
import { useAppStateContext } from '../../contexts/appStateContext';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 30,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

export default function Rewards() {
    const { appState } = useAppStateContext()
    appState.rewards = 28
    const [tab,setTab] = useState({
        rewards:true,
        orders:false,
        favorites:false
    })

    const reward = () =>{
        setTab((a) => (
            {
              orders:false, rewards:true,favorites:false
            }
          ))
    }

    const orders = () =>{
        setTab((a) => (
            {
              orders:true, rewards:false,favorites:false
            }
          ))
    }

    const favorites = () =>{
        setTab((a) => (
            {
              orders:false, rewards:false,favorites:true
            }
          ))
    }
    return (
        <Box>
            <NavBar></NavBar>
            <Box mx={5}>
                <Box display="flex" justifyContent="space-between" px="auto">
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography>
                            HEY,
                        </Typography>
                        <Typography variant="h4">
                            {appState.first_name} {appState.last_name}
                        </Typography>
                    </Box>
                    <Typography variant="h4">
                        {appState.rewards}/30
                    </Typography>
                </Box>

                <Box pt={5}>
                    <BorderLinearProgress variant="determinate" value={(appState.rewards/30)*100} />
                </Box>

                <br></br>
                <Box display="flex" flexDirection="row" justifyContent="space-between" px="auto" py={1}>
                    <Button name="rewards" onClick={reward}>
                        <Link>Rewards</Link>
                    </Button>
                    <Button onClick={orders}>
                        <Link>Orders</Link>
                    </Button>
                    <Button onClick={favorites}>
                        <Link>Favorites</Link>
                    </Button>
                </Box>
                <Box px={10} py={2}>
                    <Divider></Divider>
                </Box>
                {tab.rewards?
                <Box display="flex" flexDirection="row" justifyContent="space-between" px="auto">
                    <Card>
                        <Box mx={3}>
                            <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" width={100} height={200}></img>
                            {/* <CardMedia
                                className={styles.media}
                                image="https://goo.gl/images/yDjWG9">
                            </CardMedia> */}
                            <Typography>Reward 1</Typography>
                            <Typography>Unlock for 30 points</Typography>

                        </Box>
                    </Card>
                    <Card>
                        <Box px={3} py={3}>
                            <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" width={100} height={200}></img>
                            {/* <CardMedia
                                className={styles.media}
                                image="https://goo.gl/images/yDjWG9">
                            </CardMedia> */}
                            <Typography>Reward 2</Typography>
                            <Typography>Unlock for 30 points</Typography>

                        </Box>
                    </Card>
                    <Card>
                        <Box px={3} py={3}>
                            <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" width={100} height={200}></img>
                            {/* <CardMedia
                                className={styles.media}
                                image="https://goo.gl/images/yDjWG9">
                            </CardMedia> */}
                            <Typography>Reward 2</Typography>
                            <Typography>Unlock for 30 points</Typography>

                        </Box>
                    </Card>
                </Box>: tab.orders?
                <Card>
                    <Box p={4} display="flex" flexDirection="column">
                        <Typography>No Orders Yet</Typography>
                        <Typography>Your recent online orders can be found here</Typography>
                        <Button>
                            <Link>
                            Lets fix that
                            </Link>
                        </Button>
                    </Box>
                </Card>
                :
                <Card>
                    <Box p={4} display="flex" flexDirection="column">
                        <Typography>No Favorites Yet</Typography>
                        <Typography>Your favorite orders can be found here</Typography>
                        <Button>
                            <Link>
                            Lets fix that
                            </Link>
                        </Button>
                    </Box>
                </Card>
                }
            </Box>

        </Box>
    )
}