import React, { Component } from 'react';
import { uid } from 'react-uid';

import List from '@material-ui/core/List';

import MessagesItemText from './listItemTextData/listItemText';
import UserMessage from './currentUserMessage/currentUserMessage';

class OneListItem extends Component {
  checkUserMessages = (item, userMessagesId) => {
    if (userMessagesId.length === 0) {
      return false;
    }
    let isUserMessage = userMessagesId.find(element => element === item.id);
    if (isUserMessage) return true;
  }

  createListItems = (props) => {
    return(
      <>
      { props.data.map((item) => {
        return (
          item.map((item) => {
            const { userMessagesId } = this.props;
            let isMyMessage = this.checkUserMessages(item, userMessagesId);
            return (
              isMyMessage ?
              <UserMessage item={item}/> :
              <MessagesItemText item={item}/>
            )
          })
          )
        })
      }
      </>
    )
  }

  render() {
    return(
      <List 
        key={ uid('chatlist')}
        width='100%'
      >
        { this.createListItems(this.props) }
      </List>
    )
  }
};

export default OneListItem;