import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


function Header(props) {
  const { logout } = props;
  return (
    <AppBar
      position="static"
      color="default"
      style={{
        width: '90%',
        margin: '0 auto',
        maxWidth: '1200px',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          style={{ flexGrow: '1' }}
        >
                WebSocket Chat
        </Typography>
        <Button
          color="inherit"
          onClick={logout}
        >
              logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Header;
