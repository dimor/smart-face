
import * as actionTypes from './../actions/actionTypes';


const INITIAL_STATE = {
    token: '',
    loading: '',
    error: '',
    verified: '',
    id:''
}


const formReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.FORM_START:
            return { ...state, loading: true, error: '' }
        case actionTypes.FORM_SUCCESS:
            return { ...state, loading: false, error: '', token: action.token }
        case actionTypes.FORM_FAILED:
            return { ...state, loading: false, error: action.error }
        case actionTypes.VERIFY_TOKEN_START:
            return { ...state, verified: false }
        case actionTypes.VERIFY_TOKEN_SUCCESS:
            return { ...state, verified: true , id:action.id }
        case actionTypes.VERIFY_TOKEN_FAILED:
            return { ...state, verified: false }
        default: return state;
    }
}

export default formReducer;