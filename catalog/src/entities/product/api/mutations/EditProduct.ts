import { gql } from '../../../__generated__';

export const EDIT_PRODUCT = gql(`
    mutation EditProduct($id:ID!, $name: String, $price: Int ) {
        product: updateProduct (id: $id, name: $name, price: $price ) {
          ...ProductFields
        }
   }
`);
