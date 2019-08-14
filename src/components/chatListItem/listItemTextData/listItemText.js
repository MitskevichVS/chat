import React, { Component } from 'react';
import { uid } from 'react-uid';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import Message from '../message/message';
import MessageDate from '../date/date';
import UserAvatar from '../avatar/userAvatar';


class MessagesItemText extends Component {
  render() {
    const { item } = this.props;
    return (
      <>
        <ListItem 
          key={ item.id }
          alignItems="flex-start"
        >
          <UserAvatar name={item.from}/>
          <ListItemText
            key={ uid(item.id) }
            component="div"
            primary={ item.from }
            secondary={
              <React.Fragment key={uid(item.id + "fr")}>
                <Message message={item.message} bgcolor="#f0f0f0"/>
                <MessageDate t={item.time}/>
              </React.Fragment>
            }
          />
        </ListItem>
      </>
    )
  }
};

export default MessagesItemText;