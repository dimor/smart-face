import { Button, createMuiTheme, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PublicIcon from '@material-ui/icons/Public';
import { makeStyles , ThemeProvider ,useTheme  } from '@material-ui/styles';
import DialogUrl from '../../components/DialogUrl/DialogUrl';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import { lightGreen } from '@material-ui/core/colors';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel/CircularProgressWithLabel';

const useStyles = makeStyles((theme) => (
    {
        loader:{
            color:'white'

        },

     
    }
))



const ButtonGroup = (props) => {
    const dispatch = useDispatch();
    const [dialogUrlShow, setDialogUrlShow] = useState(false);
    const url = useSelector(state => state.face.url);
    const loading = useSelector(state => state.face.loading);
    const uploading = useSelector(state => state.face.uploading);
    const uploaded = useSelector(state=>state.face.uploaded);
    const token = useSelector(state=>state.form.token) || localStorage.getItem('auth-token');
    const defaultTheme = useTheme();



    const classes = useStyles(uploading);

    const handleDialogUrlOpen = () => {
        setDialogUrlShow(true);
    };

    const handleDialogUrlClose = () => {
        setDialogUrlShow(false);
    };

    const theme = createMuiTheme({
        palette: {
          primary: lightGreen 
        },
      });
    


      const handleUpload =(e)=>{
        e.preventDefault();
        if(e.target.files[0]){
            dispatch(actions.ImageUpload(e.target.files[0]))
        }

      }




    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <ThemeProvider theme={url &&!uploaded?theme:defaultTheme}>
                <Button
                    variant="contained"
                    color={url&&!uploaded?"primary":"default"}
                    fullWidth
                    startIcon={<PublicIcon />}
                    onClick={handleDialogUrlOpen}
                    disabled={loading ? true : false}
                >
                    Url
                </Button>
                </ThemeProvider>
            </Grid>

            <Grid item xs={6}>
            <ThemeProvider theme={uploaded?theme:defaultTheme}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }} 
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleUpload}
                    disabled={loading ? true : false}
                />
                <label htmlFor="raised-button-file">
                    < Button
                        component="span"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.uploaded}
                        startIcon={uploading? <CircularProgressWithLabel />:(uploaded?<CloudDoneIcon />:< CloudUploadIcon />)}
                    >
                        Upload
                      
                </Button >
                </label>
                </ThemeProvider>
            </Grid>

            <Grid item xs={12}>
                < Button
                    className={classes.faceButtonStyle}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    disabled={loading ? true : false}
                    size="large"
                    onClick={() => dispatch(actions.faceAnalyze(url, props.imageDementions,token))}
                >
                    Analyze Faces
                </Button >
            </Grid>
            <DialogUrl open={dialogUrlShow} onClose={handleDialogUrlClose} />

        </Grid>

    )





}

export default ButtonGroup;