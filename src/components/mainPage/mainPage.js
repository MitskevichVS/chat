import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

import Header from '../header/header';
import ChatList from '../chatList/chatList';
import ChatInput from '../chatInput/chatInput';


class MainPage extends Component {
  state = {
    messages: []
  }

  // WebSocket = require('isomorphic-ws');

  ws = new ReconnectingWebSocket('ws://st-chat.shas.tel');

  componentDidMount() {
    this.ws.onmessage = (message) => {
      const messageArray = JSON.parse(message.data).reverse();
      this.setState({messages: [...this.state.messages, messageArray]});
      document.querySelector('#chatList').scrollTop = 99999;
    }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  sendMessage = (m) => {
    let sendingData = {from: this.props.name, message: m};
    this.ws.send(JSON.stringify(sendingData));
  }

  logout = () => {
    this.props.logout(null);
  }

  render() {
    return (
      <>
        <Header logout={this.logout}/>
        <ChatList messages={this.state.messages}/> 
        <ChatInput sendMessage={this.sendMessage} name={this.props.name}/>       
      </>
    )
  }
};

export default MainPage;