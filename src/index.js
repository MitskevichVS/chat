import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const WebSocket = require('isomorphic-ws');

const ws = new WebSocket('ws://st-chat.shas.tel');

let data;

ws.onopen = () => {
  console.log(`i'm connected`);
};

ws.onmessage = (inData) => {
  data = JSON.parse(inData.data);
  console.log(data);
};

ReactDOM.render(<App />, document.querySelector('#root'));