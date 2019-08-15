import React from 'react';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { uid } from 'react-uid';
import PropTypes from 'prop-types';

function UserAvatar(props) {
  const { name } = props;
  return (
    <ListItemAvatar key={`${uid(name)}avataritem`}>
      <Avatar key={`${uid(name)}avatar`} style={{ backgroundColor: '#3399FF' }}>{ name.charAt(0).toUpperCase() }</Avatar>
    </ListItemAvatar>
  );
}

UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default UserAvatar;
