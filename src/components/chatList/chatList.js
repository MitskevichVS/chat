import React, { Component } from 'react';
import OneListItem from '../chatListItem/chatListItem';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

import CircProgress from './progress/progress';

class ChatList extends Component {
  render() {
    const { scroll, displayProgress, messages, userMessagesId } = this.props;
    return (
      <Container
        id='chatList'
        maxWidth='md'
        onScroll={scroll}
        style={{
          height: "77vh",
          overflowY: "scroll",
          overflowX: "hidden",
          marginTop: "1vh",
          marginBottom: "1vh"
        }}
        >
          {
            !displayProgress ? <CircProgress /> : <OneListItem data={messages} userMessagesId={userMessagesId}/>
          } 
      </Container>
    )
  }
};

ChatList.propTypes = {
  scroll: PropTypes.func.isRequired,
  displayProgress: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default ChatList;
