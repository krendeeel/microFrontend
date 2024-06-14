import { FC, ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AccountIcon from '@mui/icons-material/AccountCircle';

import { IComment } from '../model/IComment';

interface IProps {
  comment: IComment;
  actions?: ReactNode;
}

export const Comment: FC<IProps> = ({ comment, actions }) => {
  const information = comment.user.name + ', ' + new Date(comment.date).toLocaleDateString();

  return (
    <ListItem key={comment.id} secondaryAction={actions}>
      <ListItemAvatar>
        <Avatar>
          <AccountIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={information} secondary={comment.body} />
    </ListItem>
  );
};
