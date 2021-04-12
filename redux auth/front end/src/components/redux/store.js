import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Reducer from './counter/reducers';
import logger from 'redux-logger'




const store = createStore(
    Reducer,
    compose(applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    );



export default store;