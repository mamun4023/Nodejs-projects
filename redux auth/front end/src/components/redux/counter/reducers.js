import {FETCH_POST} from './types';


const initialState = {
    items : [],
    loading : false,
    error : null

}
const Reducer = (state = initialState, action)=> {
  
    switch(action.type){
        case "FETCH_POST_REQUEST":
            return {
                ...state,
                loading : true,
                error : null
            }

        case "FETCH_POST_SUCCESS":
            return {
                ...state,
                loading : false,
                items : action.payload
            }
        case "FETCH_POST_FAILURE":
                return {
                ...state,
                loading : true,
                error : null
            }    
        
        default :
            return state

        
    }
}

export default Reducer;