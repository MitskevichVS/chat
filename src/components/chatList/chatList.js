import React, { Component } from 'react';
// import OneListItem from '../chatListItem/chatListItem';
// import PropTypes from 'prop-types';

/* const ChatList = (data) => {
  console.log(data);
  const inMessageList = data.map((item, index) => {
     return(
      <OneListItem key={index} name={item.from} message={item.message}/>
    ) 
  });

  return (
    <div>
      {inMessageList}
    </div>
  );
}; */

class ChatList extends Component {
  render() {
    return (
      <div id='chatList'>

      </div>
    )
  }
};

export default ChatList;