import { ApolloCache } from '@apollo/client';
import { MutationUpdaterFunction } from '@apollo/client/core/types';
import {
  DeleteProductMutation,
  DeleteProductMutationVariables
} from '../../../__generated__/graphql';

export const updateCacheAfterDeleteProduct: MutationUpdaterFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables,
  unknown,
  ApolloCache<unknown>
> = (cache, { data }) => {
  if (!data?.product) {
    throw new Error('Отсутствует информация об удаленном продукте');
  }
  // удаление конретного объекта
  cache.evict({ id: cache.identify({ __typename: data.product.__typename, id: data.product.id }) });
  // удаление связанных ссылок
  cache.gc();

  cache.modify({
    fields: {
      _allProductsMeta(meta) {
        if (!meta?.count) {
          throw new Error('Отсутствуют данные о количестве продуктов!');
        }

        return {
          ...meta,
          count: meta.count - 1
        };
      }
    }
  });
};
