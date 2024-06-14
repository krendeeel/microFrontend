import { DispatchWithoutAction, FC, FormEventHandler } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { IProduct } from '../../../entities/product/model/IProduct';
import { EDIT_PRODUCT } from '../../../entities/product/api/mutations/EditProduct';

interface IParams {
  product: IProduct;
  onEditProduct: DispatchWithoutAction;
}

export const EditProductForm: FC<IParams> = ({ product, onEditProduct }) => {
  // обновление кеша происходит автоматически
  const [editProduct] = useMutation(EDIT_PRODUCT);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const name = String(formData.get('name'));

    const price = Number(formData.get('price'));

    form.reset();

    if (product.name !== name || product.price !== price) {
      void editProduct({
        variables: { id: product.id, name, price }
      });
    }

    onEditProduct();
  };

  return (
    <form onSubmit={onSubmit}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Edit Product</DialogTitle>
      <DialogContent dividers>
        <TextField
          required
          fullWidth
          size="small"
          label="name"
          name="name"
          sx={{ mb: 4 }}
          variant="outlined"
          defaultValue={product.name}
        />
        <TextField
          required
          fullWidth
          size="small"
          label="price"
          name="price"
          type="number"
          sx={{ mb: 4 }}
          variant="outlined"
          defaultValue={product.price}
        />
      </DialogContent>
      <DialogActions>
        <Button size="small" type={'submit'}>
          Edit
        </Button>
      </DialogActions>
    </form>
  );
};
