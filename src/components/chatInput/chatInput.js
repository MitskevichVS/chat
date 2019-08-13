import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

  getMessageFromUser = (event) => {
    if (event.keyCode === 13) {
      this.props.sendMessage(event.target.value);
      event.target.value = '';
    }
  }

  getInputColor = () => {
    let theme;
    if (this.props.connected) {
      theme = connected;
    } else theme = disconnected;
    return theme;
  }

  
  render() {
    return (
      <Container maxWidth='lg'>
        <ThemeProvider theme={this.getInputColor()} >
          <TextField
            id="userMessage"
            label={this.props.name + ' message:'}
            style={{ margin: 8 }}
            placeholder="Hit Enter to send message"
            fullWidth
            autoFocus 
            margin="normal"
            onFocus={this.props.checkConnection}
            onChange={this.props.checkConnection}
            onKeyUp={this.getMessageFromUser}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </ThemeProvider>
      </Container>
    )
  }
};

export default ChatInput;

