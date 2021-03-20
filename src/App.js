import React, { useEffect, useState } from 'react';
import Form from './components/Form/Form';
import Layout from './container/Layout/Layout';
import './App.css';
import { Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import Face from './container/Face/Face.js'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/index'
import axios from './axios';


const App = () => {

  const dispatch = useDispatch();


  return (
    <div className="App">
      <Switch>
        <Layout>
        <BrowserRouter basename={process.env.PUBLIC_URL} >
          <Route exact path="/" component={Form} />
          <Route exact path="/register" component={Form} />
          <PrivateRoute  dispatch={dispatch} path='/face' component={Face} />
          </BrowserRouter>
        </Layout>
      </Switch>
    </div>
  );
}


const checkAuth = async (dispatch) => {



  let token = localStorage.getItem('auth-token');

  try{
    const response = await axios.post('/verify', {}, { headers: { 'Content-Type': 'application/json', 'auth-token': token } })
    if (response.status===200) {
      dispatch(actions.verifyTokenSuccess(response.data))
      return true;
    }
  }catch(err){
    return false;
  }

  return false;
}




const PrivateRoute = ({ component: Component, ...rest }) => {

  return <Route {...rest} render={(props) => (
    checkAuth(rest.dispatch)
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
  )} />

}


export default App;
