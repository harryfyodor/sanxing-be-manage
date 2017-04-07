import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import ajax from './utils/ajax';
import { Spin } from 'antd'
import React, { Component } from 'react';

// 默认转圈
ReactDOM.render(
  <div className={'spinContainer'}>
    <Spin size="large" />
  </div>,
  document.getElementById('root')
);

if(document.cookie) {
  ajax({
    url: 'user/session'
  , method: 'get'
  , success: (resp) => {
      // if(resp.enmsg !== 'ok') {
      //   store.logout();
      // }
      ReactDOM.render(
        <App userStore={store} />,
        document.getElementById('root')
      );
    }
  });
}

ReactDOM.render(
  <App userStore={store} />,
  document.getElementById('root')
);