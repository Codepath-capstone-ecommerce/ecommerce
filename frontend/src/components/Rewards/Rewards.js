import { Typography, LinearProgress, Box, Link, Divider, Card, CardMedia } from "@material-ui/core"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import NavBar from "../NavBar/NavBar"

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
    const styles =
    {

        media: {
            height: 50,
            paddingTop: '56.25%', // 16:9,
            marginTop: '30'
        }
    };
    return (
        <div>
            <NavBar></NavBar>
            <Typography>
                HEY,
            </Typography>
            <Typography>
                Charles Lam
            </Typography>
            <Typography>
                15/30
            </Typography>
            <BorderLinearProgress variant="determinate" value={50} />
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Link>Rewards</Link>
                <Link>Orders</Link>
                <Link>Favorites</Link>
            </Box>
            <Divider></Divider>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Card>
                    <CardMedia
                        className={styles.media}
                        image="https://goo.gl/images/yDjWG9">
                    </CardMedia>
                    <Typography>Reward 1</Typography>
                    <Typography>Unlock for 30 points</Typography>
                </Card>
                <Card>
                    <CardMedia
                        image="https://goo.gl/images/yDjWG9">
                    </CardMedia>
                    <Typography>Reward 2</Typography>
                    <Typography>Unlock for 30 points</Typography>
                </Card>
                <Card>
                    <CardMedia
                        image="https://goo.gl/images/yDjWG9">
                    </CardMedia>
                    <Typography>Reward 3</Typography>
                    <Typography>Unlock for 30 points</Typography>
                </Card>
            </Box>
        </div>
    )
}