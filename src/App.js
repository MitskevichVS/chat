/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import store from 'store2';

import Login from './components/login/login';
import MainPage from './components/mainPage/mainPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }

  setName = (name) => {
    if (store.get('prevName')) {
      const prevName = store.get('prevName');
      if (prevName !== name && name !== null) {
        store.set('userMessagesId', []);
      }
    }
    this.setState({ username: name });
    store.set('username', name);
  }

  checkUserName = () => {
    const username = store.get('username');
    const checked = !!username;
    return checked;
  }

  render() {
    return (
      <>
        {
          !this.checkUserName()
            ? <Login setName={this.setName} />
            : <MainPage name={store.get('username')} logout={this.setName} />
        }
      </>
    );
  }
}

export default App;
