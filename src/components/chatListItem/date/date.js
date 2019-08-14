import React, { Component } from 'react';

import { DateTime } from "luxon";
import Typography from '@material-ui/core/Typography';
import { uid } from 'react-uid';

class MessageDate extends Component {
  getDate = (t) => DateTime.fromMillis(t);

  render() {
    const { t } = this.props;
    return (
      <Typography
        key={ uid(t + "1f4") } 
        component="span"
        variant="body2"
        display="block"
      >
      { this.getDate(t).c.year + '.' + this.getDate(t).c.month + '.' + this.getDate(t).c.day + '-' + this.getDate(t).c.hour + ':' + this.getDate(t).c.minute}
      </Typography>
    )
  }
}

export default MessageDate;