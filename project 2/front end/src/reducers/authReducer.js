import {SET_CURRET_USER} from '../actions/types';
import isEmpty from '../validation/isEmpty';


const initialState = {
    isAuthenticaed : false,
    user : {}
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRET_USER:
            return{
                ...state,
                isAuthenticaed : !isEmpty(action.payload),
                user : action.payload
            }
        default :
        return state;
    }
}