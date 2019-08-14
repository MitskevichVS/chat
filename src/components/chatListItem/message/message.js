import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { uid } from 'react-uid';

class Message extends Component {
  render() {
    const { message, bgcolor } = this.props;
    return (
      <Typography
        key={ uid(message) }
        component="span"
        color="textPrimary"
        style={{
          wordWrap: "break-word",
          wordBreak: "break-all",
          backgroundColor: bgcolor,
          borderRadius: "10px",
          padding:"1% 2%",
          display:"inline-block",
          maxWidth:"45%"
        }}
      >
      { message } 
      </Typography>
    )
  }
}

export default Message;