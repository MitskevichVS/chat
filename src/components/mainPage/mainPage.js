/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import store from 'store2';
import PropTypes from 'prop-types';

import Header from '../header/header';
import ChatList from '../chatList/chatList';
import ChatInput from '../chatInput/chatInput';
import NotificationIcon from '../../images/NotificationIcon.png';


class MainPage extends Component {
  ws = new ReconnectingWebSocket('wss://wssproxy.herokuapp.com/');

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      firstMessagesSlicedArray: [],
      displayChat: false,
      displayMessagesCount: 0,
      connectionFlag: true,
      scrollDownFlag: false,
      scrollUpFlag: false,
      userMessages: [],
      userMessagesId: [],
    };
  }

  componentDidMount() {
    if (!('Notification' in window)) {
      // eslint-disable-next-line no-alert
      alert('This browser does not support desktop notification');
    } else {
      Notification.requestPermission();
    }


    this.ws.onmessage = (message) => {
      const messageArray = JSON.parse(message.data).reverse();
      if (messageArray.length > 15) {
        const size = 15;
        const auxArray = [];
        for (let i = 0; i < Math.ceil(messageArray.length / size); i += 1) {
          auxArray[i] = messageArray.slice((i * size), (i * size) + size);
        }
        this.setState({ displayMessagesCount: auxArray.length - 1 });
        this.setState({ firstMessagesSlicedArray: auxArray });
        this.setInitialMessagesState(this.state.firstMessagesSlicedArray);
      }
      this.checkUserMessages(messageArray);
      if (messageArray.length < 15) {
        this.setState((prevState) => ({
          messages: [...prevState.messages, messageArray],
        }));
      }
      this.setState({ displayChat: true });

      if (this.state.scrollDownFlag === true) {
        const list = document.querySelector('#chatList');
        list.scrollTop = list.scrollHeight;
      }


      if (document.querySelector('#chatList') === null) {
        this.setState({ displayChat: false });
      }

      if (document.visibilityState === 'hidden' && messageArray[0] !== undefined) {
        this.notify(messageArray[0]);
      }
      this.checkListLength();
      if (store.get('userMessagesId').length > 0) {
        const userMessagesIdStore = store.get('userMessagesId');
        this.setState({ userMessagesId: userMessagesIdStore });
      }
    };
  }

  componentWillUnmount() {
    this.ws.close();
  }

  setInitialMessagesState = (array) => {
    const count = this.state.displayMessagesCount;
    if (count < 0) return;
    this.setState((prevState) => ({
      messages: [array[count], ...prevState.messages],
    }));
    this.setState({ displayMessagesCount: count - 1 });
    this.setState({ scrollUpFlag: false });
    if (array.length !== 0) {
      if (array[count].length < 15) {
        this.setInitialMessagesState(this.state.firstMessagesSlicedArray);
      }
    }
    document.querySelector('#chatList').scrollTop = 1500;
  }

  checkSocketStatus = () => {
    const status = this.ws.readyState;
    if (status === 3) {
      this.setState({ connectionFlag: false });
    } else if (status !== 3 && this.state.connectionFlag === false) {
      this.setState({ connectionFlag: true });
    }
  }

  checkListLength = () => {
    const list = document.querySelector('#chatListUl');
    if (list === null) return;
    const listChildLength = list.childNodes.length;
    const listLengthStorage = store.get('listLength');
    if (listChildLength >= listLengthStorage) {
      store.set('listLength', listChildLength);
    } else {
      store.set('listLength', 0);
      store.set('userMessagesId', []);
    }
  }

  checkUserMessages = (array) => {
    const { name } = this.props;
    const userMessage = this.state.userMessages;
    userMessage.forEach((item) => {
      // eslint-disable-next-line max-len
      const message = array.find((arrayObj) => arrayObj.from === name && arrayObj.message === item.message);
      if (message) {
        this.setState((prevState) => ({
          userMessagesId: [...prevState.userMessagesId, message.id],
        }));
        store.set('userMessagesId', this.state.userMessagesId);
      }
    });
  }

   sendMessage = (m) => {
     const { name } = this.props;
     const sendingData = { from: name, message: m };
     this.setState((prevState) => ({
       userMessages: [...prevState.userMessages, sendingData],
     }));
     this.checkSocketStatus();
     this.ws.send(JSON.stringify(sendingData));
   }

  logout = () => {
    const { logout } = this.props;
    logout(null);
    this.ws.close();
  }

  handleScroll = (event) => {
    const element = event.target;
    const { firstMessagesSlicedArray } = this.state;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.setState({ scrollDownFlag: true });
    } else if (element.scrollTop === 0) {
      this.setState({ scrollUpFlag: true });
      this.setInitialMessagesState(firstMessagesSlicedArray);
    } else {
      this.setState({ scrollDownFlag: false });
      this.setState({ scrollUpFlag: false });
    }
  }

  notify = (messageFrom) => {
    if (Notification.permission === 'granted') {
      const title = `You have a new message(s) from ${messageFrom.from}`;
      const options = {
        body: messageFrom.message,
        icon: NotificationIcon,
      };
      const notification = new Notification(title, options);
      notification.onclick = (event) => {
        event.preventDefault();
        notification.close();
      };
    }
  }

  render() {
    const { name } = this.props;
    return (
      <>
        <Header logout={this.logout} />
        <ChatList
          messages={this.state.messages}
          displayProgress={this.state.displayChat}
          scroll={this.handleScroll}
          userMessagesId={this.state.userMessagesId}
        />
        <ChatInput
          sendMessage={this.sendMessage}
          name={name}
          isConnected={this.state.connectionFlag}
          checkConnection={this.checkSocketStatus}
        />
      </>
    );
  }
}

MainPage.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default MainPage;
