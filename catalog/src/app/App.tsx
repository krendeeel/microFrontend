import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material/styles';

import { client } from './apollo/client';
import { ProductsLists } from '../features/product/ProductsList/ProductsLists';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StyledEngineProvider injectFirst>
        <ProductsLists />
      </StyledEngineProvider>
    </ApolloProvider>
  );
};

export default App;
