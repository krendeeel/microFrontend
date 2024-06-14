import { DispatchWithoutAction, FC, FormEventHandler } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { ADD_PRODUCT } from '../../../entities/product/api/mutations/AddProduct';
import { GET_PRODUCTS } from '../../../entities/product/api/queries/GetProducts';

interface IProps {
  onAddProduct: DispatchWithoutAction;
}

export const AddProductForm: FC<IProps> = ({ onAddProduct }) => {
  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [GET_PRODUCTS]
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const name = String(formData.get('name'));

    const price = Number(formData.get('price'));

    form.reset();

    void addProduct({
      variables: { name, price, seller_id: '123' }
    });

    onAddProduct();
  };

  return (
    <form onSubmit={onSubmit}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Add Product</DialogTitle>
      <DialogContent dividers>
        <TextField
          required
          fullWidth
          size="small"
          label="name"
          variant="outlined"
          name={'name'}
          sx={{ mb: 4 }}
        />
        <TextField
          required
          fullWidth
          size="small"
          label="price"
          name="price"
          type="number"
          variant="outlined"
          sx={{ mb: 4 }}
        />
      </DialogContent>
      <DialogActions>
        <Button size="small" type={'submit'}>
          Add
        </Button>
      </DialogActions>
    </form>
  );
};
