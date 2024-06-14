import React, { FC, ReactNode } from 'react';
import ListItem from '@mui/material/ListItem';
import { IProduct } from '../model/IProduct';
import ListItemText from '@mui/material/ListItemText';

interface IProps {
  product: IProduct;
  actions?: ReactNode;
}

export const Product: FC<IProps> = ({ product, actions }) => {
  const information = `${product.name} by ${product.seller.name}`;

  return (
    <ListItem secondaryAction={actions}>
      <ListItemText primary={information} secondary={`${product.price}$`} />
    </ListItem>
  );
};
