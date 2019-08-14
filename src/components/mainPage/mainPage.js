import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import store from 'store2';

import Header from '../header/header';
import ChatList from '../chatList/chatList';
import ChatInput from '../chatInput/chatInput';
import NotificationIcon from '../../images/NotificationIcon.png';


class MainPage extends Component {
  state = {
    messages: [],
    displayChat: false,
    connectionFlag: true,
    scrollDownFlag: false,
    userMessages: [],
    userMessagesId: []
  }

  ws = new ReconnectingWebSocket('ws://st-chat.shas.tel');

  componentDidMount() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }



    this.ws.onmessage = (message) => {
      const messageArray = JSON.parse(message.data).reverse();
      this.checkUserMessages(messageArray);
      console.log(messageArray);
      console.log(this.state.userMessagesId);
      this.setState(prevState => ({
        messages: [...prevState.messages, messageArray]
      }));
      this.setState({displayChat: true});
      
      if (this.state.scrollDownFlag === true) {
        const list = document.querySelector('#chatList');
        list.scrollTop = list.scrollHeight;
      }
      
      if (document.querySelector('#chatList') === null) {
        this.setState({displayChat: false});
      }
      
      if (document.visibilityState === 'hidden' && messageArray[0] !== undefined) {
        this.notify(messageArray[0]);
      }
      this.checkListLength();
      if (store.get('userMessagesId').length > 0) {
        const userMessagesIdStore = store.get('userMessagesId');
        this.setState({userMessagesId: userMessagesIdStore});
      }
    }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  checkSocketStatus = () => {
    let status = this.ws.readyState;
     if (status === 3){
       this.setState({connectionFlag: false});
      } else if (status !== 3 && this.state.connectionFlag === false) {
       this.setState({connectionFlag: true});
      }
   }

  checkListLength = () => {
    const list = document.querySelector('#chatListUl');
    if (list === null) return;
    const listChildLength = list.childNodes.length;
    const listLengthStorage = store.get('listLength');
    if (listChildLength >= listLengthStorage){
      store.set('listLength', listChildLength);
    } else {
      store.set('listLength', 0);
      store.set('userMessagesId', []);
    }
  }

   checkUserMessages = (array) => {
     const { name } = this.props;
     let userMessage = this.state.userMessages;
     userMessage.forEach(item => {
       let message = array.find(arrayObj => arrayObj.from === name && arrayObj.message === item.message);
       if(message){
         this.setState(prevState => ({
          userMessagesId: [...prevState.userMessagesId, message.id]
        }))
        store.set('userMessagesId', this.state.userMessagesId);
      }
    })
   }

   sendMessage = (m) => {
     let sendingData = {from: this.props.name, message: m};
     this.setState(prevState => ({
      userMessages: [...prevState.userMessages, sendingData]
    }));
    this.checkSocketStatus();
    this.ws.send(JSON.stringify(sendingData));
  }
  
  logout = () => {
    this.props.logout(null);
    this.ws.close();
  }

  handleScroll = (event) => {
   let element = event.target;
   if (element.scrollHeight - element.scrollTop === element.clientHeight) {
     this.setState({scrollDownFlag: true});
   } else this.setState({scrollDownFlag: false});
 }
  
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

  render() {
    return (
      <>
        <Header logout={this.logout}/>
        <ChatList 
          messages={this.state.messages} 
          displayProgress={this.state.displayChat}
          scroll={this.handleScroll}
          userMessagesId={this.state.userMessagesId}
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