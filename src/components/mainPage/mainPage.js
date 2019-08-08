import React, { Component } from 'react';

import Header from '../header/header';
import ChatList from '../chatList/chatList';
import ChatInput from '../chatInput/chatInput';


class MainPage extends Component {

  WebSocket = require('isomorphic-ws');

  ws = new WebSocket('ws://st-chat.shas.tel');

  getUserMessage = (m) => {
    let sendingData = {from: this.props.name, message: m};
    console.log(sendingData);
    this.ws.send(JSON.stringify(sendingData));
  }

  render() {
    return (
      <div>
        <Header />
        <ChatList /> 
        <ChatInput getUserMessage={this.getUserMessage} name={this.props.name}/>       
      </div>
    )
  }
};

export default MainPage;