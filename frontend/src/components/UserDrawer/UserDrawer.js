import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useAppStateContext } from '../../contexts/appStateContext';
import { useNavigate, Link } from "react-router-dom"
import classnames from 'classnames';

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    },
    paper: {
        background: "black"
      },
    customButton: {
        border: "3px solid",
        borderColor: "#2EDBFD !important",
        backgroundColor: "#000000",
        color: "white !important",
        "&:hover": {
          color: "black !important",
          backgroundColor: "#2EDBFD",
        }
      }
});

export default function UserDrawer() {
    const { appState } = useAppStateContext()
    const classes = useStyles();
    const navigate = useNavigate()
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const myRewards = () => {
        navigate("/rewards")
    }

    const myAccount = () => {
        navigate("/accountProfile")
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List >
                    <br></br>
                    <ListItem button key="My Rewards"style={{ width:'90%' , marginLeft:10, marginRight:10, backgroundColor:'white', borderRadius: 20, borderColor: "#2EDBFD", border: `3px solid`}}>
                    <Button fullWidth style={{ fontWeight:'Bold' }} onClick={myRewards} >
                        <ListItemIcon><AttachMoneyIcon /> </ListItemIcon>
                       My Rewards
                       </Button>
                        {/* <ListItemText primary={text} /> */}
                    </ListItem>
                    <br></br>
                    <ListItem button key="My Profile" style={{width:'90%' , marginLeft:10, marginRight:10, backgroundColor:'white', borderRadius: 20, borderColor: "#2EDBFD", border: `3px solid`}}>
                       <Button fullWidth  style={{ fontWeight:'Bold' }} onClick={myAccount} >
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        My Profile</Button>
                        {/* <ListItemText primary={text} /> */}
                    </ListItem>
            </List>
        </div>
    );

    return (
        <React.Fragment key={appState.first_name} >
            <Button onClick={toggleDrawer('right', true)} className={classnames(classes.customButton, "glow-button")}>{appState.first_name}</Button>
            <Drawer classes={{ paper: classes.paper }}  anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                {list('right')}
            </Drawer>
        </React.Fragment>
    );
}
