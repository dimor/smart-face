import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://corsto.herokuapp.com/https://smart-face-api.herokuapp.com',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  });
  
  export default instance;