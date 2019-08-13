import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

import Header from '../header/header';
import ChatList from '../chatList/chatList';
import ChatInput from '../chatInput/chatInput';
import NotificationIcon from '../../images/NotificationIcon.png';


class MainPage extends Component {
  state = {
    messages: [],
    displayChat: false,
    connectionFlag: true
  }

  ws = new ReconnectingWebSocket('ws://st-chat.shas.tel');

  notify = (messageFrom) => {
    if (Notification.permission === "granted") {
      let title = `You have a new message(s) from ${messageFrom.from}`;
      let options = {
        body: messageFrom.message,
        icon: NotificationIcon,
    };
      let notification = new Notification(title, options);
      notification.onclick = function(event) {
        event.preventDefault();
        notification.close();
      }
    }
  }


  checkSocketStatus = () => {
     let status = this.ws.readyState;
     if (status === 3){
       this.setState({connectionFlag: false});
     } else if (status !== 3 && this.state.connectionFlag === false) {
       this.setState({connectionFlag: true});
     }
   }
  
  componentDidMount() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }

    this.ws.onmessage = (message) => {
      const messageArray = JSON.parse(message.data).reverse();
      this.setState({messages: [...this.state.messages, messageArray]});
      this.setState({displayChat: true});

      if (document.querySelector('#chatList') !== null) {
        document.querySelector('#chatList').scrollTop = 99999;
      } else this.setState({displayChat: true});

      if (document.visibilityState === 'hidden' && messageArray[0] !== undefined) {
        this.notify(messageArray[0]);
      }
    }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  sendMessage = (m) => {
    let sendingData = {from: this.props.name, message: m};
    this.checkSocketStatus();
    this.ws.send(JSON.stringify(sendingData));
  }

  logout = () => {
    this.props.logout(null);
    this.ws.close();
  }

  render() {
    return (
      <>
        <Header logout={this.logout}/>
        <ChatList 
          messages={this.state.messages} 
          displayProgress={this.state.displayChat}
        />
        <ChatInput 
          sendMessage={this.sendMessage} 
          name={this.props.name} 
          isConnected={this.state.connectionFlag}
          checkConnection={this.checkSocketStatus}
        />       
      </>
    )
  }
};

export default MainPage;