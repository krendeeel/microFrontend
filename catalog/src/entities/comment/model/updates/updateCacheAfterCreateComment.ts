import { ApolloCache } from '@apollo/client';
import { MutationUpdaterFunction } from '@apollo/client/core/types';
import {
  CreateCommentMutation,
  CreateCommentMutationVariables
} from '../../../__generated__/graphql';
import { GET_COMMENTS } from '../../api/queries/GetComments';

export const updateCacheAfterCreateComment: MutationUpdaterFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables,
  unknown,
  ApolloCache<unknown>
> = (cache, { data }, options) => {
  if (!options?.variables) {
    throw new Error('Отствуют variables для создания комментария');
  }

  const commentsCache = cache.readQuery({
    query: GET_COMMENTS,
    variables: { product_id: options.variables.product_id }
  });

  if (!commentsCache?.comments || !data?.comment) {
    throw new Error('Отсутсвуют данные комментариев');
  }

  cache.writeQuery({
    query: GET_COMMENTS,
    variables: { product_id: options.variables.product_id },
    data: {
      __typename: commentsCache.__typename,
      comments: [...commentsCache.comments, data.comment]
    }
  });
};
