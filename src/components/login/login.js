import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


class Login extends Component {

  addLogin = (event) => {
    if (event.keyCode === 13 || event.type === 'click') {
      this.props.setName(document.querySelector('#username').value);
    }
  }

  render() {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={1}
        m={1}
        style={{ height: '70vh' }}
        
      >
        <Box
        >
          <Typography variant="h5">
            Please, log in.
          </Typography>
        </Box>
        <Box
        >
          <TextField
            id="username"
            label="Enter your name"
            placeholder="Name"
            margin="normal"
            variant="filled"
            onKeyDown={this.addLogin}
          />
        </Box>
        <Box
        >
          <Button variant="contained" type="submit" onClick={this.addLogin}>
            Submit
          </Button>
        </Box>
      </Box>
    )
  }
};

export default Login;