import React from "react";
import { Grid, Divider as MuiDivider } from "@material-ui/core";

const Divider = ({ children, ...props }) => (
  <Grid container alignItems="center" spacing={3} {...props}>
    <Grid item xs>
      <MuiDivider style={{ backgroundColor: "#2EDBFD",
        paddingTop: 1,
        paddingBottom: 1}}/>
    </Grid>
    <Grid item>{children}</Grid>
    <Grid item xs>
      <MuiDivider style={{ backgroundColor: "#2EDBFD",
        paddingTop: 1,
        paddingBottom: 1}} />
    </Grid>
  </Grid>
);

export default Divider;