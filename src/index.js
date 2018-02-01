import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Router, Route, Switch} from 'react-router';
import {routerReducer} from 'react-router-redux';

import NotFound from "./pages/404"
import Homepage from './pages/Homepage';
import './css/main.scss';

// we'll worry about redux later I just set this up so that way I can set up the redux router
const store = createStore(
    combineReducers({
        routing: routerReducer
    })
);

const history = createHistory();


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route component={NotFound}/> {/*404 Route*/}
            </Switch>
        </Router>
    </Provider> , document.getElementById('root'));
registerServiceWorker();
