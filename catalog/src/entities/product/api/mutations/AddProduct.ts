import { gql } from '../../../__generated__';

export const ADD_PRODUCT = gql(`
    mutation AddProduct($name: String!, $price: Int!, $seller_id: ID!) {
        product: createProduct(name: $name, price: $price, seller_id: $seller_id) {
           ...ProductFields
        }
    }
`);
