import React, { Component } from 'react';

import Header from '../header/header';
import ChatList from '../chatList/chatList';
import ChatInput from '../chatInput/chatInput';


class MainPage extends Component {
  state = {
    messages: []
  }

  WebSocket = require('isomorphic-ws');

  ws = new WebSocket('ws://st-chat.shas.tel');

  componentDidMount() {
    this.ws.onmessage = (message) => {
      const messageArray = JSON.parse(message.data).reverse();
      this.setState({messages: [...this.state.messages, messageArray]});
      document.querySelector('#chatList').scrollTop = 9999;
    }
  }

  getUserMessage = (m) => {
    let sendingData = {from: this.props.name, message: m};
    this.ws.send(JSON.stringify(sendingData));
  }

  render() {
    return (
      <>
        <Header />
        <ChatList messages={this.state.messages}/> 
        <ChatInput getUserMessage={this.getUserMessage} name={this.props.name}/>       
      </>
    )
  }
};

export default MainPage;