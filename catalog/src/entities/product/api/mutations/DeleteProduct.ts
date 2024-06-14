import { gql } from '../../../__generated__';

export const DELETE_PRODUCT = gql(`
    mutation DeleteProduct($id: ID!){
        product: removeProduct(id: $id) {
            id
        }
    }
`);
