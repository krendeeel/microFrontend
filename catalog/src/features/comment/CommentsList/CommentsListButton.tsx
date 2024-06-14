import React, { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import { CommentsList } from './CommentsList';

interface IProps {
  productId: string;
}

export const CommentsListButton: FC<IProps> = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton edge="end" aria-label="comments" onClick={() => setIsOpen(true)}>
        <CommentIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <CommentsList productId={productId} />
      </Dialog>
    </>
  );
};
