import { FC } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useQuery } from '@apollo/client';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { List } from '../../../shared/ui/List/List';
import { usePageQuery } from './hooks/usePageQuery';
import { Search } from '../../../shared/ui/Search/Search';
import { Product } from '../../../entities/product/ui/Product';
import { AddProductButton } from '../AddProduct/AddProductButton';
import { EditProductButton } from '../EditProduct/EditProductButton';
import { GET_PRODUCTS } from '../../../entities/product/api/queries/GetProducts';
import { DeleteProductButton } from '../DeleteProduct/DeleteProductButton';
import { CommentsListButton } from '../../comment/CommentsList/CommentsListButton';

const PRODUCTS_PER_PAGE = 7;

export const ProductsLists: FC = () => {
  const { page, search, setPage, setSearch } = usePageQuery();

  const { data, error, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      page,
      searchQuery: search,
      perPage: PRODUCTS_PER_PAGE
    }
  });

  const numberOfPages = Math.ceil((data?.meta?.count ?? 0) / PRODUCTS_PER_PAGE);

  return (
    <Stack spacing={1} direction="column">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Catalog</Typography>
        <Stack direction="row">
          <Search onSearch={setSearch} />
          <AddProductButton />
        </Stack>
      </Stack>
      <Divider />
      <Box sx={{ flexGrow: 1, height: 520 }}>
        {loading && <CircularProgress />}
        {error && (
          <Alert variant="filled" severity="error">
            loading error:(
          </Alert>
        )}
        {data && (
          <List
            entities={data.products}
            template={(product) => (
              <Product
                key={product.id}
                product={product}
                actions={
                  <Stack spacing={1} direction="row">
                    <EditProductButton product={product} />
                    <CommentsListButton productId={product.id} />
                    <DeleteProductButton productId={product.id} />
                  </Stack>
                }
              />
            )}
          />
        )}
      </Box>
      <Divider />
      <Pagination
        size="small"
        page={page + 1}
        count={numberOfPages}
        onChange={(_, page) => setPage(page - 1)}
      />
    </Stack>
  );
};
