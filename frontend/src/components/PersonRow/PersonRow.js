import { Avatar,Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        marginTop:10,
        margin:20
    }
}));

export default function PersonRow() {
    const classes = useStyles()
    return (
      <div className={classes.root}>
          <Avatar/>
          <Typography>Name here</Typography>
      </div>
    );
}