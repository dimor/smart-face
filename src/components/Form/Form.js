import { Avatar, Button, Card, CardContent, Container, Grid, LinearProgress, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';




const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));




const Form = (props) => {


    const classes = useStyles();

    const isReg = props.location.pathname === '/register' ? true : false;

    const [emailTextFieldValue, setEmailTextFieldValue] = useState();
    const [passwordTextFieldValue, setPasswordTextFieldValue] = useState();
    const [nameTextFieldValue, setNameTextFieldValue] = useState();
    const [isSnackBarOpen, setSnackBar] = useState(false);
    let history = useHistory();


    const dispatch = useDispatch();
    let formError = useSelector(state => state.form.error);
    let user = useSelector(state => state.form.user);
    let loading = useSelector(state => state.form.loading);



    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(actions.formSubmit({ emailTextFieldValue, passwordTextFieldValue, nameTextFieldValue }, isReg, history))
    }

    const handleSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBar(false);
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    useEffect(() => {

        setSnackBar(false);

        if(formError){
            setSnackBar(true)
        }
    }, [formError])


    return (
        <>
            <Container maxWidth="sm">
            <Snackbar open={isSnackBarOpen} autoHideDuration={6000} onClose={handleSnackBar}>
                <Alert onClose={handleSnackBar} severity="error">
                {formError?'Something went wrong, please try again later':null}
                </Alert>
            </Snackbar>
                <Card>
                    <CardContent>
                        <div className={classes.paper} >
                            <Avatar className={classes.avatar}  >
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {isReg ? 'Register' : 'Sign In'}
                            </Typography>
                            <form onSubmit={handleSubmit} method="post" className={classes.form} noValidate>
                                <TextField
                                    disabled={loading ? true : false}
                                    error={formError ? true : false}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e => setEmailTextFieldValue(e.target.value))}
                                />
                                <TextField
                                    disabled={loading ? true : false}
                                    error={formError ? true : false}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e => setPasswordTextFieldValue(e.target.value))}
                                />

                                {isReg ? <TextField
                                    disabled={loading ? true : false}
                                    error={formError ? true : false}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    type="text"
                                    id="name"
                                    onChange={(e => setNameTextFieldValue(e.target.value))}
                                /> : null}

                                {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                                <Button
                                    className={classes.submit}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading ? true : false}

                                >
                                    {isReg ? 'Register' : 'Sign In'}
                                </Button>
                                {loading ? (<LinearProgress />) :
                                    (<Grid container justify="center">
                                        <Grid item>
                                            <NavLink to={isReg ? '/' : '/register'}>
                                                {isReg ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                                            </NavLink>
                                        </Grid>
                                    </Grid>)}
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </>

    )

}

export default Form;