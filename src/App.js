import React, { Component } from 'react';

import Login from './components/login/login';

class App extends Component {
  state = {
    username: null
  }

  setName = (username) => {
    console.log(username);
    this.setState({username});
    console.log(this);
  }

  render() {
    return (
      <div id='App'>
        {
          !this.state.username ? 
          <Login setName={this.setName}/>
          : <Login/>
        }
      </div>
    )
  }
}

export default App;