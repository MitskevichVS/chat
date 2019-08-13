import React, { Component } from 'react';
import { DateTime } from "luxon";
import { uid } from 'react-uid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
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
                  key={ item.id }
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar>{ item.from.charAt(0).toUpperCase() }</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    key={ uid(item.id) }
                    component="div"
                    primary={ item.from }
                    secondary={
                      <React.Fragment>
                        <Typography
                          key={ uid(index) }
                          component="span"
                          color="textPrimary"
                          style={{
                            wordWrap: "break-word",
                            wordBreak: "break-all",
                            backgroundColor: "#99daad",
                            borderRadius: "10px",
                            padding:"1% 2%",
                            display:"inline-block",
                            maxWidth:"45%"
                          }}
                        >
                        { item.message } 
                        </Typography>
                        <Typography
                          key={ uid(item.time + 0.4) } 
                          component="span"
                          variant="body2"
                          display="block"
                        >
                        { this.getDate(item.time).c.year + '.' + this.getDate(item.time).c.month + '.' + this.getDate(item.time).c.day + '-' + this.getDate(item.time).c.hour + ':' + this.getDate(item.time).c.minute}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
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