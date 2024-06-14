import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const customFetch: typeof fetch = (uri, options) => {
  if (typeof options?.body !== 'string') {
    throw new Error('Некорректное body запроса');
  }
  const { operationName } = JSON.parse(options.body);
  // т.к. все операции graphQL выполняются по одной ссылке, в режиме разработки для удобства следует
  // добавлять к ним префикс соотвествующей операции
  return fetch(`${uri}?operation=${operationName}`, options);
};

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    fetch: customFetch
  })
});
