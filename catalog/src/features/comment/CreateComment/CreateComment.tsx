import React, { FC, FormEventHandler, memo } from 'react';
import Stack from '@mui/material/Stack';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

import { CREATE_COMMENT } from '../../../entities/comment/api/mutations/CreateComment';
import { updateCacheAfterCreateComment } from '../../../entities/comment/model/updates/updateCacheAfterCreateComment';

interface IProps {
  productId: string;
}

export const CreateComment: FC<IProps> = memo(({ productId }) => {
  const [createComment] = useMutation(CREATE_COMMENT, {
    update: updateCacheAfterCreateComment
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const body = String(formData.get('body'));

    form.reset();

    void createComment({
      variables: { body, date: new Date(), product_id: productId, user_id: '23' }
    });
  };

  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Stack direction="row" alignItems="center">
        <TextField
          required
          fullWidth
          size="small"
          name={'body'}
          variant="outlined"
          placeholder={'Enter comment...'}
        />
        <IconButton type={'submit'} aria-label="send" color="primary">
          <SendIcon />
        </IconButton>
      </Stack>
    </form>
  );
});
