import React, { Component } from 'react';
import { uid } from 'react-uid';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import Message from '../message/message';
import MessageDate from '../date/date';

class UserMessage extends Component {
  render() {
    const { item } = this.props;
    return(
      <>
        <ListItem 
          key={ item.id }
          alignItems="flex-start"
          style={{flexDirection: "row-reverse"}}
        >
          <ListItemText
            key={ uid(item.id) }
            component="div"
            style={{textAlign: "right"}}
            primary={ item.from }
            secondary={
              <React.Fragment key={uid(item.id + "fr")}>
                <Message message={item.message} bgcolor="#99DAAD"/>
                <MessageDate t={item.time}/>
              </React.Fragment>
            }
          />
        </ListItem>
      </>
    )
  }
}

export default UserMessage;