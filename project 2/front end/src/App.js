
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilis/setAuthToken';
import {setCurrentUser} from './actions/authActions';




// load component
import Footer from './components/layouts/footer';

import Navbar from './components/layouts/navbar';
import Landing from './components/layouts/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';


//  load redux store
import store from './store';


// check for token

if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get u ser inof and exp
  const decoded  = jwt_decode(localStorage.jwtToken);

  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

}

class App extends  React.Component{


  render(){

    return(
      <>
        <Provider store = {store} >
        <Router>
          <div className = "app">
            <Navbar />
             <Route exact path = "/" component = {Landing} />

             <div className = "container">
               <Route exact path ="/register" component = {Register} />
               <Route exact path= "/login" component = {Login} />
             </div>
            
          </div>
        </ Router>
        </Provider>  
        <Footer/>

      </>
    )
  }
}


export default App;
