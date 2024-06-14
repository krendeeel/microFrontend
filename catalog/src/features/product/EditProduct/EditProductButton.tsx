import { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import { EditProductForm } from './EditProductForm';
import { IProduct } from '../../../entities/product/model/IProduct';

interface IProps {
  product: IProduct;
}

export const EditProductButton: FC<IProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton color="primary" onClick={() => setIsOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <EditProductForm product={product} onEditProduct={() => setIsOpen(false)} />
      </Dialog>
    </>
  );
};
