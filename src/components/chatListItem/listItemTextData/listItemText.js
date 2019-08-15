import React, { Component } from 'react';
import { uid } from 'react-uid';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';

import Message from '../message/message';
import MessageDate from '../date/date';
import UserAvatar from '../avatar/userAvatar';


// eslint-disable-next-line react/prefer-stateless-function
class MessagesItemText extends Component {
  render() {
    const { item } = this.props;
    return (
      <>
        <ListItem
          key={item.id}
          alignItems="flex-start"
        >
          <UserAvatar name={item.from} />
          <ListItemText
            key={uid(item.id)}
            component="div"
            primary={item.from}
            secondary={(
              <React.Fragment key={uid(`${item.id}fr`)}>
                <Message message={item.message} bgcolor="#f0f0f0" />
                <MessageDate t={item.time} />
              </React.Fragment>
)}
          />
        </ListItem>
      </>
    );
  }
}

MessagesItemText.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessagesItemText;
