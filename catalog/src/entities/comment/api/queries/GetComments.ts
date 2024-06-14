import { gql } from '../../../__generated__';

export const GET_COMMENTS = gql(`
    query GetComments($product_id: ID!) {
        comments: allComments (filter: { product_id: $product_id }) {
           ...CommentFields
        }
    }
`);
