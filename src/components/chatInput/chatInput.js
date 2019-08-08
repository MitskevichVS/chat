import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';


class ChatInput extends Component {

  getMessageFromUser = (event) => {
    if (event.keyCode === 13) {
      this.props.getUserMessage(event.target.value);
      event.target.value = '';
    }
  }
  
  render() {
    return (
      <div id='userInput' style={{width: '98vw'}}>
        <TextField
          id="userMessage"
          label={this.props.name + ' message:'}
          style={{ margin: 8 }}
          placeholder="Hit Enter to send message"
          fullWidth
          margin="normal"
          onKeyUp={this.getMessageFromUser}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    )
  }
};

export default ChatInput;

