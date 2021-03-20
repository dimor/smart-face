import * as actionTypes from './actionTypes';
import axios from '../../axios';
import globalAxios from 'axios';
 

export const setImageUrl = (url) => {

    return {
        type: actionTypes.SET_IMAGE_URL,
        url: url
    }
}




export const faceAnalyze = (url, imageDementions,token) => dispatch => {

    console.log('@TOKWN',token);

    dispatch(faceAnalyzeStart())

    axios.post('/image', {
        input: url
    },{
        headers:{
            'Content-Type': 'application/json',
            'auth-token': token
        }
    })
        .then(response => calculateFaceLocation(response, imageDementions))
        .then(data => dispatch(faceAnalyzeSuccess(data)))
        .catch(error => dispatch(faceAnalyzeFailed(error)))

}



export const faceAnalyzeStart = () => {
    return {
        type: actionTypes.FACE_ANALYZE_START
    }
}





export const faceAnalyzeSuccess = ({boxes,user}) => {

    console.log(user);
    return {
        type: actionTypes.FACE_ANALYZE_SUCCESS,
        user:user,
        boxes:boxes
    }
}


export const faceAnalyzeFailed = (error) => {
    return {
        type: actionTypes.FACE_ANALYZE_FAILED,
        error: error
    }
}






export const calculateFaceLocation = (responseData, { width, height }) => {

    console.log(responseData);
    const regions = responseData.data.clarifai.outputs[0].data.regions;
    let bounded_faces;

    if(regions){
         bounded_faces = regions.map(region => {

            const clarifaiFace = region.region_info.bounding_box;
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height)
            }
        })
    }



    return { 'boxes': bounded_faces, 'user':responseData.data.user};

}




export const ImageUploadStart = () => {
    return {
        type: actionTypes.IMAGE_UPLOAD_START
    }
}


export const ImageUploadSuccess = (imgUrl) => {

    return {
        type: actionTypes.IMAGE_UPLOAD_SUCCESS,
        url: imgUrl
    }
}


export const ImageUploadFailed = (error) => {
    return {
        type: actionTypes.IMAGE_UPLOAD_FAILED,
        error: error
    }
}




export const ImageUploadProgress = (value)=>{
    return{
        type: actionTypes.IMAGE_UPLOAD_PROGRESS,
        value:value
    }
}


export const ImageUpload = (filePath) => dispatch => {




    // dispatch(ImageUploadStart());
    // setTimeout(()=>{ 
    //     dispatch(ImageUploadSuccess('https://images.unsplash.com/photo-1612831198181-fe18661c31b6?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'))
    // }, 5000)


    console.log(filePath);
    dispatch(ImageUploadStart());

    const formData = new FormData();
    formData.append('file', filePath);
    formData.append('randomname', 'randomname');


    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
              let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              dispatch(ImageUploadProgress(percentCompleted))
        }
    }




    globalAxios.post('https://corsto.herokuapp.com/https://uguu.se/api.php?d=upload-tool', formData, config)
        .then(response => {
            dispatch(ImageUploadSuccess(response.data))
        })
        .catch(err => dispatch(ImageUploadFailed(err)))
}




export const getProfileDataStart = () => {
    return {
        type: actionTypes.GET_PROFILE_DATA_START
    }
}


export const getProfileDataSuccess = (data) => {

    console.log(data);

    return {
        type: actionTypes.GET_PROFILE_DATA_SUCCESS,
        user:data.data.user
    }
}


export const getProfileDataFailed = (error) => {
    return {
        type: actionTypes.GET_PROFILE_DATA_FAILED,
        error: error
    }
}


export const getProfileData =(id)=>dispatch=>{
    if(id!==undefined){
        dispatch(getProfileDataStart())
        axios.post('/profile',{"id":id})
        .then(data=> dispatch(getProfileDataSuccess(data)))
        .catch(err=> dispatch(getProfileDataFailed(err)))
    }
}