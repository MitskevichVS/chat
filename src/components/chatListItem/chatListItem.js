import React, { Component } from 'react';
import { DateTime } from "luxon";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


class OneListItem extends Component {

  getDate = (time) => DateTime.fromMillis(time);

  render() {
    return(
      <List
        width='100%'
      >
      { this.props.data.map((item) => {
        return (
          item.map((item) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={ item.from }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          display="inline"
                          color="textSecondary"
                          whiteSpace="normal"
                        >
                        { this.getDate(item.time).c.year + '.' + this.getDate(item.time).c.month + '.' + this.getDate(item.time).c.day + '-' + this.getDate(item.time).c.hour + ':' + this.getDate(item.time).c.minute}
                        </Typography>
                        <Typography
                          display="block"
                          overflow="hidden"
                          style={{width: '100%'}}
                        >
                        {"- " + item.message } 
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="div" />
              </>
            )
          })
          )
        })
      }
      </List>
    )
  }
};

export default OneListItem;