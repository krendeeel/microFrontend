import { gql } from '../../../__generated__';

export const GET_PRODUCTS = gql(`
    query GetProducts($page: Int!, $perPage: Int!, $searchQuery: String) {
        products: allProducts(page: $page, perPage: $perPage, filter: {q: $searchQuery}) {
           ...ProductFields
        }
        meta: _allProductsMeta(filter: {q: $searchQuery}) {
            count
        }
    }
`);
