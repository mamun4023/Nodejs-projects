
import axios from 'axios';
import {FETCH_POST} from './types';

export const fetchPost = ()=> {
    
    return async(disptch, getState) => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")

        disptch({
            type : FETCH_POST,
            payload : response.data
        }) 
    }
}