import React,{useEffect,useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';

  const useStyles = makeStyles(()=>{
    return{

        loader:{
          color:'white'
        },
        colorPrimary:{
          color:'white'
        }

    }
  })




const CircularProgressWithLabel=(props)=> {

  const progress = useSelector(state=>state.face.progress);

  const classes = useStyles();



  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress thickness="1.5" className={classes.colorPrimary} variant="caption" size={25 } value={progress}/>
      <Box
        color="white"
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" >{`${progress}%`}</Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;


