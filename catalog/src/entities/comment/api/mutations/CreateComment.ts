import { gql } from '../../../__generated__';

export const CREATE_COMMENT = gql(`
    mutation CreateComment($body: String!, $date: Date!, $user_id: ID!,$product_id: ID!) {
        comment: createComment(body: $body, date: $date, user_id: $user_id, product_id: $product_id) {
            ...CommentFields
        }
    }
`);
