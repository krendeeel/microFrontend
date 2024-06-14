import React, { FC } from 'react';
import Alert from '@mui/material/Alert';
import { useQuery } from '@apollo/client';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import { List } from '../../../shared/ui/List/List';
import { Comment } from '../../../entities/comment/ui/Comment';
import { CreateComment } from '../CreateComment/CreateComment';
import { GET_COMMENTS } from '../../../entities/comment/api/queries/GetComments';

interface IProps {
  productId: string;
}

export const CommentsList: FC<IProps> = ({ productId }) => {
  const { data, loading, error } = useQuery(GET_COMMENTS, {
    variables: { product_id: productId }
  });

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }}>Comments</DialogTitle>
      <DialogContent dividers sx={{ height: '100%' }}>
        {loading && <CircularProgress />}
        {error && (
          <Alert variant="filled" severity="error">
            loading error:(
          </Alert>
        )}
        {data && (
          <List
            entities={data.comments}
            template={(comment) => <Comment key={comment.id} comment={comment} />}
          />
        )}
      </DialogContent>
      <DialogActions>
        <CreateComment productId={productId} />
      </DialogActions>
    </>
  );
};
