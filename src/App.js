import React, { Component } from 'react';

import Login from './components/login/login';
import MainPage from './components/mainPage/mainPage';

class App extends Component {
  state = {
    username: null
  }

  setName = (username) => {
    this.setState({username});
  }

  render() {
    return (
      <>
        {
          !this.state.username ? 
          <Login setName={this.setName}/>
          : <MainPage name={this.state.username}/>
        }
      </>
    )
  }
}

export default App;