import axios from 'axios';
import {GET_ERRORS,SET_CURRET_USER} from './types';
import setAuthToken  from '../utilis/setAuthToken';
import jwt_decode from 'jwt-decode';

// regiser user
export const registeruser = (userData, history) => dispatch => {
     axios.post("http://localhost:3001/api/users/register", userData)
            .then((res)=> {
                history.push('/login')
            })
            .catch((err)=> {
                
                dispatch({
                    type : GET_ERRORS,
                    payload : err.response.data
                })

            })
}


//  login - get user token
export const loginUser = userData => dispatch => {
    axios.post('http://localhost:3001/api/users/login', userData)
        .then(res => {
            //save token to localstorage
            const {token} = res.data;
            localStorage.setItem('jwtToken', token)
            // set token to auth header

            setAuthToken(token);

            // decode token to get user data
            const decoded = jwt_decode(token);

            // et current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
};



// set logged inuser
export const setCurrentUser = (decoded) => {
    return {
        type : SET_CURRET_USER,
        payload : decoded
    }
}
