import React, { Component } from 'react';
import OneListItem from '../chatListItem/chatListItem';
import Container from '@material-ui/core/Container';
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
          <OneListItem data={this.props.messages} />  
      </Container>
    )
  }
};

export default ChatList;