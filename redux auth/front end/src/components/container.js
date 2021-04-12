import React, { useEffect } from 'react';

import {useDispatch, useSelector } from 'react-redux';
import {fetchPost} from './redux/counter/actions'




const Container = ()=> {
    
    const dispatch = useDispatch();
    const posts = useSelector(state => state);
    useEffect(()=> {
        dispatch(fetchPost())

    },[])


    return(
        <>
           

            {
                posts.map(post => <div> {post.title} </div>)
            }
           
           

        </>

    )
}


export default Container;
