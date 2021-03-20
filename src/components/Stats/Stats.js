import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.background.paper,
    },
    primary:{
        variant:'h2'
    }
 
}));


const primaryTypographyProps ={
    variant:'h3',
    align:'center'
} 

const secondaryTypographyProps={
    variant:'body1',
    align:'center'
}


const Stats = () => {

    const classes = useStyles();

    const {user_faces,user_used,rank} = useSelector(state=>state.face.user);



    return (
        <>
            <List className={classes.root} >
                <ListItem className={classes.container} >
                  <ListItemText secondaryTypographyProps={secondaryTypographyProps} primaryTypographyProps={primaryTypographyProps} primary={user_used} secondary="Used"/>
                </ListItem>
                <ListItem className={classes.container}>
                    <ListItemText  secondaryTypographyProps={secondaryTypographyProps} primaryTypographyProps={primaryTypographyProps} primary={user_faces} secondary="Faces Regonized" />
                </ListItem>
                <ListItem className={classes.container}>
                    <ListItemText  secondaryTypographyProps={secondaryTypographyProps} primaryTypographyProps={primaryTypographyProps} primary={rank} secondary="Rank" />
                </ListItem>
            </List>
        </>
    )
}

export default Stats; 