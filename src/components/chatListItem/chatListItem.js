import React, { Component } from 'react';
import { uid } from 'react-uid';

import List from '@material-ui/core/List';
import PropTypes from 'prop-types';

import MessagesItemText from './listItemTextData/listItemText';
import UserMessage from './currentUserMessage/currentUserMessage';

class OneListItem extends Component {
  checkUserMessages = (item, userMessagesId) => {
    if (userMessagesId.length === 0) {
      return false;
    }
    const isUserMessage = userMessagesId.find((element) => element === item.id);
    if (isUserMessage) { return true; } return false;
  }

  createListItems = (props) => (
    <>
      { props.data.map((item) => (
        item.map((inItem) => {
          const { userMessagesId } = this.props;
          const isMyMessage = this.checkUserMessages(inItem, userMessagesId);
          return (
            isMyMessage
              ? <UserMessage item={inItem} />
              : <MessagesItemText item={inItem} />
          );
        })
      ))}
    </>
  )

  render() {
    return (
      <List
        key={uid('chatlist')}
        width="100%"
        id="chatListUl"
      >
        { this.createListItems(this.props) }
      </List>
    );
  }
}

OneListItem.propTypes = {
  userMessagesId: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default OneListItem;
