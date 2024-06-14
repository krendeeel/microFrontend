import { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { AddProductForm } from './AddProductForm';

export const AddProductButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton color="primary" onClick={() => setIsOpen(true)}>
        <AddIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <AddProductForm onAddProduct={() => setIsOpen(false)} />
      </Dialog>
    </>
  );
};
