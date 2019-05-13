import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";
import usersReducer from "./reducers/usersReducer";
import {loadState, saveState} from "./localStorage";
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../axios-api';


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveState({
        users: {
            user: store.getState().users.user
        }
    });
});

axios.interceptors.request.use(config => {
    try{
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {
        //
    }
    return config;
});

export default store;