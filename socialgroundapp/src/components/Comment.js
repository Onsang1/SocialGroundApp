// import { useState } from "react";
// import { useHistory } from "react-router-dom";

import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import {styled} from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: '36ch',
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
// }));

function Comments() {
  // const classes = useStyles();

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '36ch',
        bgcolor: 'Background.paper',
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1609220361638-14ceb45e5e1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
        </ListItemAvatar>
        <ListItemText
          primary="username"
          secondary={(
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              sx={{
                display: 'inline',
              }}
            >
              this is comment
            </Typography>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default Comments;
