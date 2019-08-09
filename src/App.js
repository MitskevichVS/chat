import React, { Component } from 'react';
import store from 'store2';

import Login from './components/login/login';
import MainPage from './components/mainPage/mainPage';

class App extends Component {
  state = {
    username: null
  }

  setName = (username) => {
    this.setState({username});
    store.set('username', username);
  }

  checkUserName = () => {
    const username = store.get('username');
    let checked = username ? true : false;
    return checked;
  }

  render() {
    return (
      <>
        {
          !this.checkUserName() ? 
          <Login setName={this.setName}/>
          : <MainPage name={store.get('username')}/>
        }
      </>
    )
  }
}

export default App;