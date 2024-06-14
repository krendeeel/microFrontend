import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from '../../../entities/product/api/mutations/DeleteProduct';
import { updateCacheAfterDeleteProduct } from '../../../entities/product/model/updates/updateCacheAfterDeleteProduct';

interface IProps {
  productId: string;
}

export const DeleteProductButton: FC<IProps> = ({ productId }) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update: updateCacheAfterDeleteProduct
  });

  return (
    <IconButton
      edge="end"
      aria-label="delete"
      onClick={() => deleteProduct({ variables: { id: productId } })}>
      <DeleteIcon />
    </IconButton>
  );
};
