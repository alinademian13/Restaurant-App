import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import { history, interceptors } from './_helpers';

import App from './App/App';

import './index.css';

import 'antd/dist/antd.css';

interceptors.setup();

render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
