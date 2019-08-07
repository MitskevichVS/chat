import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../src/components/header/page';

const WebSocket = require('isomorphic-ws')

const ws = new WebSocket('ws://st-chat.shas.tel');

ws.onopen = () => {
  console.log(`i'm connected`);
};

ws.onmessage = (inData) => {
  let data = inData.data;
  console.log(JSON.parse(data));
};

const element = <Header />;
ReactDOM.render(element, document.querySelector('#root'));