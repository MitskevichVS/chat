import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class Header extends Component {
  render() {
    return (
      <header>
        <Container maxWidth='lg'>
          <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="h6" color="inherit" style={{flexGrow: '1'}}>
                  WebSocket Chat
                </Typography>
                <Button color="inherit" onClick={this.props.logout} style={{marginRight: '1%', border: '1px solid #9a9a9c'}}>Logout</Button>
              </Toolbar>
            </AppBar>
          </Container>
      </header>
    )
  }
};

export default Header