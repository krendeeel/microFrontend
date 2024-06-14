import { gql } from '../../../__generated__';

// импорт происходит автоматически, можно добавить в параметры кеша
export const COMMENT_FIELDS = gql(`
    fragment CommentFields on Comment {
        id
        body
        date
        user: User {
            id
            name
        }
    }
`);
