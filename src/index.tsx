import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import authReducer from './store/reducers/auth';
import logsReducer from './store/reducers/locationLogs';
import timeTrackerReducer from './store/reducers/timetracker';
import spotifyReducer from './store/reducers/spotify';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    logs: logsReducer,
    timetracker: timeTrackerReducer,
    spotify: spotifyReducer
});

// const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunk))
// );

const store = createStore(rootReducer,
    applyMiddleware(thunk)
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
