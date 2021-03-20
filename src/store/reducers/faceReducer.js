
import * as actionTypes from '../actions/actionTypes';


const INITIAL_STATE = {
    user: '',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
    loading: false,
    boxes: [],
    error: '',
    uploading: false,
    uploaded: false,
    progress: 0,
    loadingProfile:false
}


const faceReducer = (state = INITIAL_STATE, action) => {



    switch (action.type) {
        case actionTypes.SET_IMAGE_URL:
            return { ...state, uploaded: false, url: action.url, boxes: [] }
        case actionTypes.FACE_ANALYZE_START:
            return { ...state, loading: true, boxes: [] }
        case actionTypes.FACE_ANALYZE_SUCCESS:
            return { ...state, boxes: action.boxes, loading: false, user: action.user }
        case actionTypes.FACE_ANALYZE_FAILED:
            return { ...state, loading: false, error: action.error }
        case actionTypes.IMAGE_UPLOAD_START:
            return { ...state, loading: true, uploading: true, boxes: [] }
        case actionTypes.IMAGE_UPLOAD_SUCCESS:
            return { ...state, loading: false, uploading: false, url: action.url, uploaded: true }
        case actionTypes.IMAGE_UPLOAD_FAILED:
            return { ...state, loading: false, uploading: false, error: action.error, uploaded: false }
        case actionTypes.IMAGE_UPLOAD_PROGRESS:
            return { ...state, progress: action.value }
        case actionTypes.UPDATE_DATA:
            return { ...state, user: action.user }
        case actionTypes.GET_PROFILE_DATA_START:
            return { ...state, loadingProfile: true}
        case actionTypes.GET_PROFILE_DATA_SUCCESS:
            return { ...state, loadingProfile: false, user: action.user }
        case actionTypes.GET_PROFILE_DATA_FAILED:
            return { ...state, loadingProfile: false, error: action.error }
        default: return state;
    }


}


export default faceReducer;