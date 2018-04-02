import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Route, Switch} from 'react-router';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import Login from "./pages/Login";
import GamePage from './pages/GamePage';
import NotFound from "./pages/404"

import "normalize.css"
import './css/main.scss';

import './lib/socket';

import gameServerReducer from './redux/reducers/gameServerReducer';
import webSocketReducer from "./redux/reducers/webSocketReducer";

const history = createHistory();

export const store = createStore(
    combineReducers({
        routing: routerReducer,
        gameServer: gameServerReducer,
        socket: webSocketReducer
    }), applyMiddleware(thunk, routerMiddleware(history))
);


window.onbeforeunload = (e) => {
    if (store.gameServer.socket) {
        try {
            store.gameServer.socket.closeSocket();
        } catch (err) {
            console.log(err.toString());
        }
    }
};

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/game" component={GamePage}/>
                <Route component={NotFound}/> {/*404 Route*/}
            </Switch>
        </ConnectedRouter>
    </Provider> , document.getElementById('root'));
registerServiceWorker();
