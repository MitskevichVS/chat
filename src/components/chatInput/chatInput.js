import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';

const connected = createMuiTheme({
  palette: {
    primary: {
      main: '#00b200',
    },
  },
});

const disconnected = createMuiTheme({
  palette: {
    primary: {
      main: '#cc0000',
    },
  },
});

class ChatInput extends Component {
  clearInput = () => {
    document.querySelector('#userMessage').value = '';
  }

  getMessageFromUser = (event) => {
    const { sendMessage } = this.props;
    if (event.keyCode === 13) {
      sendMessage(event.target.value);
      this.clearInput();
    }
  }

  getInputColor = () => {
    let theme;
    const { isConnected } = this.props;
    if (isConnected === true) {
      theme = connected;
    } else theme = disconnected;
    return theme;
  }
  
  render() {
    const { name, checkConnection } = this.props;
    return (
        <ThemeProvider theme={this.getInputColor()} >
          <TextField
            id="userMessage"
            label={name + " message:"}
            style={{ 
              margin: "0 auto",
              width: "90%",
              display: "block",
              maxWidth: "1200px"
            }}
            placeholder="Hit Enter to send message"
            fullWidth
            autoFocus 
            onFocus={checkConnection}
            onChange={checkConnection}
            onKeyUp={this.getMessageFromUser}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </ThemeProvider>
    )
  };
}

ChatInput.propTypes = {
  name: PropTypes.string.isRequired,
  checkConnection: PropTypes.func.isRequired,
};

export default ChatInput;

