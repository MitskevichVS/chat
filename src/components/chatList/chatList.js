import React, { Component } from 'react';
import OneListItem from '../chatListItem/chatListItem';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

class ChatList extends Component {
  render() {
    const { scroll, displayProgress, messages } = this.props;
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
            !displayProgress ? 
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
            <OneListItem data={messages}/>
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
