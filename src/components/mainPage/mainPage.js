import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

import Header from '../header/header';
import ChatList from '../chatList/chatList';
import ChatInput from '../chatInput/chatInput';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


class MainPage extends Component {
  state = {
    messages: [],
    showNotification: false,
    notificationMessageFrom: '',
    displayChat: false,
    connectionFlag: true
  }

  ws = new ReconnectingWebSocket('ws://st-chat.shas.tel');

  closeNotification = () => {
    this.setState({showNotification: false})
  }

  checkSocketStatus = () => {
     let status = this.ws.readyState;
     console.log(status);
     if (status === 3){
       this.setState({connectionFlag: false});
     } else if (status !== 3 && this.state.connectionFlag === false) {
       this.setState({connectionFlag: true});
     }
   }
  
  componentDidMount() {
    this.ws.onmessage = (message) => {
      const messageArray = JSON.parse(message.data).reverse();
      this.setState({messages: [...this.state.messages, messageArray]});
      this.setState({displayChat: true});
      if (document.querySelector('#chatList') !== null) {
        document.querySelector('#chatList').scrollTop = 99999;
      } else this.setState({displayChat: true});
      if (document.visibilityState === 'hidden' && messageArray[0] !== undefined) {
        this.setState({showNotification: true, notificationMessageFrom: messageArray[0].from})
      }
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
    this.ws.close();
  }

  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.showNotification}
          autoHideDuration={2500}
          //disableWindowBlurListener={false}
          onClose={this.closeNotification}
          message={<span id="message-id">You have a message from { this.state.notificationMessageFrom }</span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.closeNotification}
            >
              x
            </IconButton>
          ]}
        />
        <Header logout={this.logout}/>
        <ChatList messages={this.state.messages} displayProgress={this.state.displayChat}/>
        <ChatInput sendMessage={this.sendMessage} name={this.props.name} connected={this.state.connectionFlag}/>       
      </>
    )
  }
};

export default MainPage;