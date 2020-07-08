import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Common/css/Index.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import store from './store'
import { Provider } from 'mobx-react'
import * as serviceWorker from './serviceWorker';
moment.locale('zh-cn');
ReactDOM.render(
    <Provider {...store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
