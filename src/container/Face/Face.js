import { Card, CardContent, CardMedia, Container, Grow, LinearProgress } from '@material-ui/core';
import React, { useRef, useEffect, useState } from 'react';
import Stats from '../../components/Stats/Stats';
import { makeStyles } from '@material-ui/styles';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import DialogFirstTime from '../../components/DialogFirstTime/DialogFirstTime';
import { CallToActionSharp } from '@material-ui/icons';
import * as actions from '../../store/actions/index'
import { useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    cardMedia: {
        marginBottom: theme.spacing(2)
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
    },
    image: {
        filter: props => props.isUploading || !props.isImageLoaded ? 'blur(8px)' : null,
        [theme.breakpoints.only('xs')]: {
            maxHeight: '100%',
            maxWidth: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            maxHeight: '600px',
            maxWidth: '100%',
        },
        [theme.breakpoints.up('md')]: {
            maxHeight: '600px',
            maxWidth: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            maxHeight: '350px',
            maxWidth: '100%',
        },
        [theme.breakpoints.up('xl')]: {
            maxHeight: '600px',
            maxWidth: '100%',
        },

        objectFit: 'contain',
    },
    skeleton: {
        marginBottom: theme.spacing(2)
    },
    box: {
        position: 'absolute',
        boxShadow: ' 0 0 0 3px #149df2 inset',
        zIndex: '144'
    },
    uploadLoader: {
        display: props => props.isUploading ? 'block' : 'none',
        position: 'absolute',
        top: '50%',
    },
    scanner: {
        display: props => props.isLoading && !props.isUploading ? 'block' : 'none',
        width: '100%',
        height: '3px',
        backgroundColor: 'red',
        opacity: '0.7',
        position: 'absolute',
        boxShadow: '0px 0px 8px 10px rgba(170, 11, 23, 0.49)',
        top: '50%',
        animationName: '$scan',
        animationDuration: '4s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        zIndex: '200',
        animationPlayState: props => props.isLoading ? 'running' : 'paused'
    },
    '@keyframes scan': {
        '0%': {
            boxShadow: '0px 0px 8px 10px rgba(170, 11, 23, 0.49)',
            top: '50%'
        },
        '25%': {
            boxShadow: ' 0px 6px 8px 10px rgba(170, 11, 23, 0.49)',
            top: '5px'
        },
        '75%': {
            boxShadow: '0px - 6px 8px 10px rgba(170, 11, 23, 0.49)',
            top: '98%'
        }

    }
}));




const Face = () => {

    const [imageDementions, setImageDementions] = useState({ width: '', height: '' });
    const [isImageLoaded, setImageLoaded] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    let imageUrl = useSelector(state => state.face.url);
    const imageThumbnail = useRef(null);
    const boxes = useSelector(state => state.face.boxes);
    const loading = useSelector(state => state.face.loading);
    const uploading = useSelector(state => state.face.uploading);
    const classes = useStyles({ isImageLoaded: isImageLoaded, isUploading: uploading, isLoading: loading });
    const progress = useSelector(state => state.face.progress);
    const showFirstTimeDialog = localStorage.getItem('showFirstTimeDialog');
    const id = useSelector(state => state.form.id);
    const location = useLocation();

    const mappedBoxes = boxes ?
        boxes.map((box, i) => {
            return (
                <Grow
                    key={i}
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                >
                    <div
                        className={classes.box}
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol
                        }}>
                    </div>
                </Grow>
            )
        }) : {};

    useEffect(() => {

        if (boxes) {
            setChecked(true)
        } else {
            setChecked(false)
        }

        if (imageUrl) {
            setImageLoaded(false);
            imageThumbnail.current.src = imageUrl;
            imageThumbnail.current.onload = (() => {
                setImageDementions({ width: imageThumbnail.current.clientWidth, height: imageThumbnail.current.clientHeight });
                setImageLoaded(true);
            })
        }

    }, [imageUrl, boxes])


    useEffect(() => {
        if(id === undefined){
            console.log(id);
          return;
        }else{ 
            dispatch(actions.getProfileData(id));
      }},[id]);





    return (
        <Container>
            {!showFirstTimeDialog ? <DialogFirstTime /> : null}
            <Card>
                <CardContent>

                    <Stats />

                    {!isImageLoaded || uploading ? <LinearProgress value={progress} /> : null}

                    <CardMedia
                        className={classes.cardMedia}
                        title="Smart-Face">

                        <div className={classes.imageContainer}>


                            <div className={classes.scanner}></div>


                            <img alt="img" className={classes.image} ref={imageThumbnail} />

                            {boxes ? mappedBoxes : <div></div>}



                        </div>

                    </CardMedia>

                    <ButtonGroup imageDementions={imageDementions} />



                </CardContent>
            </Card>
        </Container>
    )
}

export default Face;