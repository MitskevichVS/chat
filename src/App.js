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

  setName = (usernamelog) => {
    this.setState({ username: usernamelog });
    store.set('username', usernamelog);
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
