import * as actionTypes from './actionTypes';
import axios from '../../axios';
import globalAxios from 'axios';

export const form_start = () => (
    {
        type: actionTypes.FORM_START
    }
);

export const form_success = (token) => (
    {
        type: actionTypes.FORM_SUCCESS,
        token: token,
    }
);


export const form_failed = (error) => {
    return {
        type: actionTypes.FORM_FAILED,
        error: error
    }
};


export const update_data = (user) => {
    return {
        type: actionTypes.UPDATE_DATA,
        user: user
    }
}




export const verifyTokenStart = () => {
    return {
        type: actionTypes.VERIFY_TOKEN_START
    }
}

export const verifyTokenSuccess = (id) => {
    return {
        type: actionTypes.VERIFY_TOKEN_SUCCESS,
        id:id
    }
}

export const verifyTokenFailed = () => {
    return {
        type: actionTypes.VERIFY_TOKEN_FAILED,
    }
}



export const verifyToken = () => dispatch=> {

    dispatch(verifyTokenStart());

   let token = localStorage.getItem('auth-token');
   
   if(!token) return dispatch(verifyTokenFailed());
   
   axios.post('/verify', {},
   {
       headers: {
           'Content-Type': 'application/json',
           'auth-token': token
        }
    })
    .then(match=>{
        
        console.log(match);
        if(match.status === 200){
            return dispatch(verifyTokenSuccess(match.data));
        }else{
            return dispatch(verifyTokenFailed());
        }
    }).catch(err=>{
        return dispatch(verifyTokenFailed(err));
    })
        
   

}



export const formSubmit = ({ emailTextFieldValue, passwordTextFieldValue, nameTextFieldValue }, isReg, history) => dispatch => {

                

    dispatch(form_start())
    const url = isReg ? '/register' : '/signin'

    axios.post(url, {
        email: emailTextFieldValue,
        name: nameTextFieldValue,
        password: passwordTextFieldValue
    })
        .then(response => {

            const token = response.headers['auth-token'];
            localStorage.setItem('auth-token',token);
            dispatch(update_data(response.data.user));
            dispatch(form_success(token))
            isReg ? history.push('/') : history.push('/face')
        })
        .catch(err => {
        console.log(err.response.status);
        dispatch(form_failed(err.response))
        });


}

