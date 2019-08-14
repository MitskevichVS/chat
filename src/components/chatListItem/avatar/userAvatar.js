import React, { Component } from 'react';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { uid } from 'react-uid';

class UserAvatar extends Component {
  render() {
    const { name } = this.props;
    return (
      <ListItemAvatar key={ uid(name) + "avataritem" }>
        <Avatar key={ uid(name) + "avatar" }>{ name.charAt(0).toUpperCase() }</Avatar>
      </ListItemAvatar>
    )
  }
}

export default UserAvatar;
