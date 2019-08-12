import React, { Component } from 'react';
import OneListItem from '../chatListItem/chatListItem';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
// import PropTypes from 'prop-types';

class ChatList extends Component {

  render() {
    return (
      <Container
        id='chatList'
        maxWidth='md'
        style={{
          height: '72vh',
          overflowY: "scroll",
          overflowX: "hidden",
          marginTop: "3%",
          marginBottom: "3%"
        }}
        >
          {
            !this.props.displayProgress ? 
            <div 
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <CircularProgress />
              <Typography variant="subtitle2" gutterBottom>
                Try to find some messages...
              </Typography>
            </div> :
            <OneListItem data={this.props.messages} />
          } 
      </Container>
    )
  }
};

export default ChatList;