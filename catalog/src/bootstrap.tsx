import App from './app/App';
import { client } from './app/apollo/client';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material/styles';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root not found!');
}

const container = createRoot(root);
container.render(
  <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ApolloProvider>
);
