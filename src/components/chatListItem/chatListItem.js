import React, { Component } from 'react';
import { DateTime } from "luxon";
import { uid } from 'react-uid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


class OneListItem extends Component {

  getDate = (time) => DateTime.fromMillis(time);

  createListItems = (props) => {
    return(
      <>
      { props.data.map((item) => {
        return (
          item.map((item, index) => {
            return (
              <>
                <ListItem 
                  alignItems="flex-start"
                  key={ item.id } 
                >
                  <ListItemAvatar>
                    <Avatar>{ item.from.charAt(0).toUpperCase() }</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    component="div"
                    primary={ item.from }
                    key={ uid(item.id) }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          display="inline"
                          whitespace="normal"
                          key={ uid(item.time + 0.4) } 
                        >
                        { this.getDate(item.time).c.year + '.' + this.getDate(item.time).c.month + '.' + this.getDate(item.time).c.day + '-' + this.getDate(item.time).c.hour + ':' + this.getDate(item.time).c.minute}
                        </Typography>
                        <Typography
                          key={ uid(index) } 
                          component="span"
                          overflow="hidden"
                          color="textPrimary"
                        >
                        {"- " + item.message } 
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="div" key={ uid(index + 'sw') } />
              </>
            )
          })
          )
        })
      }
      </>
    )
  }


  render() {
    return(
      <List 
        key={ uid('chatlist')}
        width='100%'
      >
        { this.createListItems(this.props) }
      </List>
    )
  }
};

export default OneListItem;