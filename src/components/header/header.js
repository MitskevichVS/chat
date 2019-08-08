import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

class Header extends Component {
  render() {
    return (
      <header>
        <Container maxWidth='lg'>
          <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  WebSocket Chat
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
      </header>
    )
  }
};

export default Header