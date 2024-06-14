import { gql } from '../../../__generated__';

export const PRODUCT_FIELDS = gql(`
    fragment ProductFields on Product {
        id
        name
        price
        seller: Seller{
            id
            name
        }
    }
`);
