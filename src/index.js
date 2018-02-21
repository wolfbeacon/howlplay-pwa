import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Router, Route, Switch} from 'react-router';
import {routerReducer} from 'react-router-redux';

import Login from "./pages/Login";
import GamePage from './pages/GamePage';
import NotFound from "./pages/404"

import "normalize.css"
import './css/main.scss';

import './lib/socket';

import socketApi from './lib/socket';

// we'll worry about redux later I just set this up so that way I can set up the redux router
const store = createStore(
    combineReducers({
        routing: routerReducer
    })
);

const history = createHistory();

window.onbeforeunload = (e) => {
    try {
        socketApi.closeSocket();
    } catch (err) {
        console.log(err.toString());
    }
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/game" component={GamePage}/>
                <Route component={NotFound}/> {/*404 Route*/}
            </Switch>
        </Router>
    </Provider> , document.getElementById('root'));
registerServiceWorker();
