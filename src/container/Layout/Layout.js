import React from 'react';
import { Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    gridStyle: {
        height: '100vh' 
    }
})


const Layout = (props) => {

    const classes = useStyles();

    return (
        <Grid
            className={classes.gridStyle}
            container
            direction="row"
            justify="center"
            alignItems="center" >
            <Grid item >
               {props.children}
            </Grid>
        </Grid>);
}


export default Layout;
